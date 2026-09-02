"""
Pruebas de acciones de ruta del conductor y sincronización de estados (Iniciar, Pausar, Finalizar, Ubicación)
"""
import pytest
from datetime import datetime, date
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database.connection import Base
from app.models import Usuario, Rol, Conductor, Vehiculo, Ruta, AsignacionConductor, AsignacionVehiculo, SeguimientoRuta
from app.api.routes.driver_routes import start_route, pause_route, finish_route, get_driver_routes, update_route_location


@pytest.fixture
def db_setup():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = TestingSessionLocal()

    cond_rol = Rol(nombre_rol="Conductor", descripcion_rol="Conductor")
    db.add(cond_rol)
    db.commit()
    db.refresh(cond_rol)

    driver_user = Usuario(
        id_rol=cond_rol.id_rol,
        nombres_usuario="Juan",
        apellidos_usuario="Pérez",
        correo_usuario="juan.perez@vextor.com",
        contrasenia_usuario="hashedpass",
        estado_usuario="ACTIVO"
    )
    db.add(driver_user)
    db.commit()
    db.refresh(driver_user)

    driver = Conductor(
        id_usuario=driver_user.id_usuario,
        nombre_conductor="Juan",
        apellido_conductor="Pérez",
        cedula_conductor="1098765432",
        telefono_conductor="3101234567",
        licencia="C2",
        estado_conductor="DISPONIBLE",
        fecha_ingreso=date(2025, 1, 10)
    )
    db.add(driver)

    vehicle = Vehiculo(
        placa="ABC123",
        marca="Chevrolet",
        modelo="NHR",
        anio=2023,
        color="Blanco",
        tipo_vehiculo="Camión",
        capacidad_pasajeros=3,
        kilometraje_actual=10000,
        kilometraje_limite_mantenimiento=15000,
        estado_vehiculo="DISPONIBLE"
    )
    db.add(vehicle)

    route = Ruta(
        codigo_ruta="RUT-TEST-01",
        nombre_ruta="Ruta Centro - Norte",
        origen="4.609710, -74.081750",
        destino="4.711000, -74.072100",
        fecha_programada=datetime.now(),
        estado_ruta="PROGRAMADA"
    )
    db.add(route)
    db.commit()

    db.refresh(driver)
    db.refresh(vehicle)
    db.refresh(route)

    asig_c = AsignacionConductor(
        id_conductor=driver.id_conductor,
        id_ruta=route.id_ruta,
        estado_asignacion="ACTIVA"
    )
    asig_v = AsignacionVehiculo(
        id_vehiculo=vehicle.id_vehiculo,
        id_ruta=route.id_ruta,
        estado_asignacion="ACTIVA"
    )
    db.add(asig_c)
    db.add(asig_v)
    db.commit()

    yield db, driver_user, driver, vehicle, route

    db.close()


def test_driver_my_routes_initial(db_setup):
    db, driver_user, driver, vehicle, route = db_setup

    res = get_driver_routes(db=db, current_user=driver_user)
    assert res["conductor"]["nombre_conductor"] == "Juan"
    assert res["conductor"]["estado_conductor"] == "DISPONIBLE"
    assert res["active_route"] is None
    assert len(res["assigned_routes"]) == 1
    assert res["assigned_routes"][0]["id_ruta"] == str(route.id_ruta)


def test_start_route_workflow(db_setup):
    db, driver_user, driver, vehicle, route = db_setup

    # Start route
    res_start = start_route(id_ruta=route.id_ruta, db=db, current_user=driver_user)
    assert res_start["estado_ruta"] == "EN_PROCESO"
    assert res_start["estado_conductor"] == "EN_RUTA"

    # Refresh entities
    db.refresh(route)
    db.refresh(driver)
    db.refresh(vehicle)

    assert route.estado_ruta == "EN_PROCESO"
    assert driver.estado_conductor == "EN_RUTA"
    assert vehicle.estado_vehiculo == "EN_RUTA"

    # Verify active tracking record created
    seg = db.query(SeguimientoRuta).filter(SeguimientoRuta.id_ruta == route.id_ruta).first()
    assert seg is not None
    assert seg.estado_seguimiento == "ACTIVO"

    # Verify get_driver_routes returns active_route
    my_routes = get_driver_routes(db=db, current_user=driver_user)
    assert my_routes["active_route"] is not None
    assert my_routes["active_route"]["id_ruta"] == str(route.id_ruta)


def test_pause_and_finish_route_workflow(db_setup):
    db, driver_user, driver, vehicle, route = db_setup

    # Start route first
    start_route(id_ruta=route.id_ruta, db=db, current_user=driver_user)

    # Pause route
    res_pause = pause_route(id_ruta=route.id_ruta, db=db, current_user=driver_user)
    assert res_pause["estado_ruta"] == "SUSPENDIDA"
    assert res_pause["estado_conductor"] == "NO_DISPONIBLE"

    db.refresh(route)
    db.refresh(driver)
    db.refresh(vehicle)
    assert route.estado_ruta == "SUSPENDIDA"
    assert driver.estado_conductor == "NO_DISPONIBLE"
    assert vehicle.estado_vehiculo == "DISPONIBLE"

    # Finish route
    res_finish = finish_route(id_ruta=route.id_ruta, db=db, current_user=driver_user)
    assert res_finish["estado_ruta"] == "COMPLETADA"

    db.refresh(route)
    db.refresh(driver)
    db.refresh(vehicle)
    assert route.estado_ruta == "COMPLETADA"
    assert driver.estado_conductor == "DISPONIBLE"
    assert vehicle.estado_vehiculo == "DISPONIBLE"

    # Verify tracking status
    seg = db.query(SeguimientoRuta).filter(SeguimientoRuta.id_ruta == route.id_ruta).first()
    assert seg.estado_seguimiento == "FINALIZADO"


def test_update_route_location_http(db_setup):
    db, driver_user, driver, vehicle, route = db_setup

    # Start route
    start_route(id_ruta=route.id_ruta, db=db, current_user=driver_user)

    # Send location
    payload = {"latitud": 4.6500, "longitud": -74.0800, "velocidad": 42.5, "heading": 180.0}
    res_loc = update_route_location(id_ruta=route.id_ruta, payload=payload, db=db, current_user=driver_user)
    assert res_loc["status"] == "ok"

    seg = db.query(SeguimientoRuta).filter(SeguimientoRuta.id_ruta == route.id_ruta).first()
    assert float(seg.latitud) == 4.65
    assert float(seg.longitud) == -74.08
    assert float(seg.velocidad) == 42.5
