"""
Test for /api/routes/driver/my-routes endpoint payload structure
"""
import pytest
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import get_db, Base
from app.models import Usuario, Rol, Conductor
from app.core.security import hash_password, create_access_token


@pytest.fixture
def test_db():
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

    driver_role = Rol(nombre_rol="Conductor", descripcion_rol="Driver")
    db.add(driver_role)
    db.commit()
    db.refresh(driver_role)

    driver_user = Usuario(
        id_rol=driver_role.id_rol,
        nombres_usuario="Carlos",
        apellidos_usuario="Perez",
        correo_usuario="carlos.driver@vextor.com",
        contrasenia_usuario=hash_password("Driver123!"),
        estado_usuario="ACTIVO"
    )
    db.add(driver_user)
    db.commit()
    db.refresh(driver_user)

    driver = Conductor(
        id_usuario=driver_user.id_usuario,
        nombre_conductor="Carlos",
        apellido_conductor="Perez",
        cedula_conductor="1098765432",
        licencia="C1",
        telefono_conductor="3001234567",
        estado_conductor="DISPONIBLE",
        fecha_ingreso=date.today()
    )
    db.add(driver)
    db.commit()

    yield db

    db.close()
    Base.metadata.drop_all(bind=engine)
    app.dependency_overrides.clear()


def test_get_driver_my_routes_returns_expected_structure(test_db):
    client = TestClient(app)
    driver_user = test_db.query(Usuario).filter(Usuario.correo_usuario == "carlos.driver@vextor.com").first()
    token = create_access_token({"sub": driver_user.correo_usuario, "role": "Conductor"})

    headers = {"Authorization": f"Bearer {token}"}
    res = client.get("/api/routes/driver/my-routes", headers=headers)

    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, dict)
    assert "conductor" in data
    assert "active_route" in data
    assert "assigned_routes" in data
    assert "history_routes" in data
    assert isinstance(data["assigned_routes"], list)
    assert isinstance(data["history_routes"], list)
