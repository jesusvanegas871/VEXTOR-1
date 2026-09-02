import pytest
import uuid
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database.connection import Base
from app.models import Ruta, AsignacionConductor, AsignacionVehiculo, Conductor, Vehiculo, Rol, Usuario
from app.services.crud_services import RouteService


@pytest.fixture
def db_routes_session():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = TestingSessionLocal()

    cond_rol = Rol(id_rol=uuid.uuid4(), nombre_rol="Conductor")
    db.add(cond_rol)
    db.commit()

    u_driver = Usuario(
        id_usuario=uuid.uuid4(),
        id_rol=cond_rol.id_rol,
        nombres_usuario="Juan",
        apellidos_usuario="Pérez",
        correo_usuario="juan@vextor.com",
        contrasenia_usuario="hash",
        estado_usuario="ACTIVO"
    )
    db.add(u_driver)
    db.commit()

    driver = Conductor(
        id_conductor=uuid.uuid4(),
        id_usuario=u_driver.id_usuario,
        nombre_conductor="Juan",
        apellido_conductor="Pérez",
        cedula_conductor="100100100",
        licencia="C2",
        estado_conductor="DISPONIBLE",
        fecha_ingreso=datetime.now().date()
    )
    db.add(driver)

    vehicle = Vehiculo(
        id_vehiculo=uuid.uuid4(),
        placa="ABC123",
        marca="Volvo",
        modelo="FH16",
        anio=2023,
        tipo_vehiculo="Camión",
        capacidad_pasajeros=2,
        kilometraje_actual=1000,
        kilometraje_limite_mantenimiento=10000,
        estado_vehiculo="DISPONIBLE"
    )
    db.add(vehicle)
    db.commit()

    # Route 1: Assigned driver and vehicle
    r1 = Ruta(
        id_ruta=uuid.uuid4(),
        codigo_ruta="RUTA-001",
        nombre_ruta="Bogotá - Medellín",
        origen="Bogotá",
        destino="Medellín",
        fecha_programada=datetime.now(),
        estado_ruta="PROGRAMADA"
    )
    db.add(r1)
    db.commit()

    asig_c = AsignacionConductor(id_conductor=driver.id_conductor, id_ruta=r1.id_ruta, estado_asignacion="ACTIVA")
    asig_v = AsignacionVehiculo(id_vehiculo=vehicle.id_vehiculo, id_ruta=r1.id_ruta, estado_asignacion="ACTIVA")
    db.add(asig_c)
    db.add(asig_v)

    # Route 2: Unassigned route
    r2 = Ruta(
        id_ruta=uuid.uuid4(),
        codigo_ruta="RUTA-002",
        nombre_ruta="Cali - Pasto",
        origen="Cali",
        destino="Pasto",
        fecha_programada=datetime.now(),
        estado_ruta="PROGRAMADA"
    )
    db.add(r2)
    db.commit()

    yield db, driver, vehicle, r1, r2

    db.close()


def test_get_all_routes_sql(db_routes_session):
    db, driver, vehicle, r1, r2 = db_routes_session

    routes = RouteService.get_all(db)
    assert len(routes) == 2

    r1_res = next(r for r in routes if r.codigo_ruta == "RUTA-001")
    r2_res = next(r for r in routes if r.codigo_ruta == "RUTA-002")

    assert r1_res.id_conductor == driver.id_conductor
    assert r1_res.id_vehiculo == vehicle.id_vehiculo

    assert r2_res.id_conductor is None
    assert r2_res.id_vehiculo is None
