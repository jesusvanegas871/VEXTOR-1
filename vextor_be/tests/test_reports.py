"""
Pruebas para el módulo de reportes (log, data, export, RBAC)
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import get_db, Base
from app.models import Usuario, Rol, Vehiculo, Conductor, Ruta, Mantenimiento, Actividad
from app.core.security import hash_password, create_access_token


@pytest.fixture
def test_db_reports():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = TestingSessionLocal()

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    # Roles
    admin_role = Rol(nombre_rol="Administrador", descripcion_rol="Admin")
    user_role = Rol(nombre_rol="Usuario", descripcion_rol="Usuario normal")
    db.add_all([admin_role, user_role])
    db.commit()
    db.refresh(admin_role)
    db.refresh(user_role)

    # Usuarios
    admin_user = Usuario(
        id_rol=admin_role.id_rol,
        nombres_usuario="Admin",
        apellidos_usuario="Reportes",
        correo_usuario="admin_reports@vextor.com",
        contrasenia_usuario=hash_password("Admin123!"),
        estado_usuario="ACTIVO"
    )
    regular_user = Usuario(
        id_rol=user_role.id_rol,
        nombres_usuario="Usuario",
        apellidos_usuario="Normal",
        correo_usuario="user_reports@vextor.com",
        contrasenia_usuario=hash_password("User123!"),
        estado_usuario="ACTIVO"
    )
    db.add_all([admin_user, regular_user])
    db.commit()

    # Datos de prueba para vehículos, conductores, etc.
    v1 = Vehiculo(
        placa="XYZ999",
        marca="Chevrolet",
        modelo="NPR",
        anio=2021,
        color="Blanco",
        tipo_vehiculo="Camión",
        capacidad_pasajeros=3,
        kilometraje_actual=15000,
        kilometraje_limite_mantenimiento=20000,
        estado_vehiculo="DISPONIBLE"
    )
    db.add(v1)
    db.commit()

    yield db

    db.close()
    Base.metadata.drop_all(bind=engine)
    app.dependency_overrides.clear()


def test_log_report_activity(test_db_reports):
    client = TestClient(app)
    admin_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "admin_reports@vextor.com").first()
    token = create_access_token({"sub": admin_user.correo_usuario, "role": "Administrador"})
    headers = {"Authorization": f"Bearer {token}"}

    res = client.post("/api/reports/log", json={"report_name": "Reporte de Vehículos", "format": "pdf"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["status"] == "success"

    # Verificar registro en auditoría
    act = test_db_reports.query(Actividad).filter(Actividad.tipo_accion == "REPORTE").first()
    assert act is not None
    assert "Reporte de Vehículos" in act.descripcion


def test_get_report_data(test_db_reports):
    client = TestClient(app)
    admin_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "admin_reports@vextor.com").first()
    token = create_access_token({"sub": admin_user.correo_usuario, "role": "Administrador"})
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/reports/data?report_type=vehicles", headers=headers)
    assert res.status_code == 200
    json_data = res.json()
    assert json_data["status"] == "success"
    assert json_data["total_count"] == 1
    assert json_data["items"][0]["Placa"] == "XYZ999"


def test_export_report_pdf_and_csv(test_db_reports):
    client = TestClient(app)
    admin_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "admin_reports@vextor.com").first()
    token = create_access_token({"sub": admin_user.correo_usuario, "role": "Administrador"})
    headers = {"Authorization": f"Bearer {token}"}

    # CSV export
    res_csv = client.get("/api/reports/export?report_type=vehicles&format=csv", headers=headers)
    assert res_csv.status_code == 200
    assert "text/csv" in res_csv.headers["content-type"]
    assert "XYZ999" in res_csv.text

    # PDF export (HTML printable window)
    res_pdf = client.get("/api/reports/export?report_type=vehicles&format=pdf", headers=headers)
    assert res_pdf.status_code == 200
    assert "text/html" in res_pdf.headers["content-type"]
    assert "VEXTOR" in res_pdf.text


def test_export_excel_rbac(test_db_reports):
    client = TestClient(app)

    # Admin export XLSX -> 200 OK
    admin_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "admin_reports@vextor.com").first()
    admin_token = create_access_token({"sub": admin_user.correo_usuario, "role": "Administrador"})
    res_admin = client.get("/api/reports/export?report_type=vehicles&format=xlsx", headers={"Authorization": f"Bearer {admin_token}"})
    assert res_admin.status_code == 200

    # Non-admin export XLSX -> 403 Forbidden
    reg_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "user_reports@vextor.com").first()
    user_token = create_access_token({"sub": reg_user.correo_usuario, "role": "Usuario"})
    res_user = client.get("/api/reports/export?report_type=vehicles&format=xlsx", headers={"Authorization": f"Bearer {user_token}"})
    assert res_user.status_code == 403
    assert "Solo los usuarios con rol 'Administrador'" in res_user.json()["detail"]


def test_export_excel_rbac_error_message(test_db_reports):
    client = TestClient(app)
    reg_user = test_db_reports.query(Usuario).filter(Usuario.correo_usuario == "user_reports@vextor.com").first()
    user_token = create_access_token({"sub": reg_user.correo_usuario, "role": "Usuario"})

    res = client.get("/api/reports/export?report_type=vehicles&format=xlsx", headers={"Authorization": f"Bearer {user_token}"})
    assert res.status_code == 403
    json_resp = res.json()
    assert json_resp["detail"] == "Solo los usuarios con rol 'Administrador' pueden exportar en formato Excel."
