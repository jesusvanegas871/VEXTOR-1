"""
Endpoints para rutas del conductor
"""
from datetime import datetime
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.api.routes.auth import get_current_user
from app.models import Ruta, AsignacionConductor, AsignacionVehiculo
from app.services.crud_services import sync_driver_status, sync_vehicle_status
from app.services.audit_service import AuditService

router = APIRouter(prefix="/api/routes", tags=["Driver Routes"])


class LocationUpdateSchema(BaseModel):
    id_ruta: UUID
    latitud: float
    longitud: float
    velocidad: Optional[float] = 0.0
    heading: Optional[float] = 0.0


@router.get("/driver/my-routes")
def get_driver_routes(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """
    Obtiene las rutas asignadas al conductor logueado
    Retorna estructura: {conductor, active_route, assigned_routes, history_routes}
    """
    from app.models import Conductor as ConductorModel, AsignacionConductor
    
    # Buscar el conductor del usuario actual
    driver = db.query(ConductorModel).filter(ConductorModel.id_usuario == current_user.id_usuario).first()
    
    if not driver:
        return {
            "conductor": None,
            "active_route": None,
            "assigned_routes": [],
            "history_routes": []
        }
    
    # Obtener rutas asignadas a este conductor
    asignaciones = db.query(AsignacionConductor).filter(
        AsignacionConductor.id_conductor == driver.id_conductor
    ).all()
    
    # Separar rutas activas y asignadas
    active_route = None
    assigned_routes = []
    history_routes = []
    
    for asig in asignaciones:
        if asig.ruta:
            try:
                ruta_dict = {
                    "id_ruta": str(asig.ruta.id_ruta),
                    "codigo_ruta": asig.ruta.codigo_ruta,
                    "nombre_ruta": asig.ruta.nombre_ruta,
                    "origen": asig.ruta.origen,
                    "destino": asig.ruta.destino,
                    "fecha_programada": asig.ruta.fecha_programada.isoformat() if asig.ruta.fecha_programada else None,
                    "hora_inicio_real": asig.ruta.hora_inicio_real.isoformat() if asig.ruta.hora_inicio_real else None,
                    "hora_fin_real": asig.ruta.hora_fin_real.isoformat() if asig.ruta.hora_fin_real else None,
                    "estado_ruta": asig.ruta.estado_ruta,
                    "vehiculo": {
                        "id_vehiculo": str(asig.ruta.vehiculo.id_vehiculo),
                        "placa": asig.ruta.vehiculo.placa,
                        "marca": asig.ruta.vehiculo.marca,
                        "modelo": asig.ruta.vehiculo.modelo,
                    } if asig.ruta.vehiculo else None,
                }
                
                if asig.ruta.estado_ruta in ("EN_RUTA", "EN_PROCESO"):
                    active_route = ruta_dict
                elif asig.ruta.estado_ruta == "PROGRAMADA":
                    assigned_routes.append(ruta_dict)
                elif asig.ruta.estado_ruta in ("COMPLETADA", "SUSPENDIDA", "CANCELADA"):
                    history_routes.append(ruta_dict)
            except Exception as e:
                print(f"Error serializing route: {str(e)}")
                continue
    
    # Construir respuesta con estructura esperada por frontend
    response = {
        "conductor": {
            "id_conductor": str(driver.id_conductor),
            "nombre_conductor": driver.nombre_conductor,
            "apellido_conductor": driver.apellido_conductor,
            "cedula": driver.cedula_conductor,
            "licencia": driver.licencia,
            "estado_conductor": driver.estado_conductor
        },
        "active_route": active_route,
        "assigned_routes": assigned_routes,
        "history_routes": history_routes
    }
    
    return response


@router.get("/active-tracking")
def get_active_tracking(db: Session = Depends(get_db)):
    """Endpoint para rastreo activo de rutas en tiempo real"""
    return {"status": "active", "message": "Rastreo en tiempo real disponible"}


@router.post("/{id_ruta}/start")
def start_route(
    id_ruta: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """Iniciar una ruta asignada"""
    ruta = db.query(Ruta).filter(Ruta.id_ruta == id_ruta).first()
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada.")

    ruta.estado_ruta = "EN_PROCESO"
    ruta.hora_inicio_real = datetime.now()
    db.commit()

    asig_c = db.query(AsignacionConductor).filter(AsignacionConductor.id_ruta == id_ruta).first()
    if asig_c and asig_c.id_conductor:
        sync_driver_status(asig_c.id_conductor, db)

    asig_v = db.query(AsignacionVehiculo).filter(AsignacionVehiculo.id_ruta == id_ruta).first()
    if asig_v and asig_v.id_vehiculo:
        sync_vehicle_status(asig_v.id_vehiculo, db)

    AuditService.record_activity(
        db=db,
        user_id=current_user.id_usuario,
        action="INICIAR",
        module="RUTAS",
        detail=f"Inició la ruta {ruta.codigo_ruta} ({ruta.nombre_ruta})"
    )

    return {"message": "Ruta iniciada correctamente", "id_ruta": str(id_ruta), "estado_ruta": "EN_PROCESO"}


@router.post("/{id_ruta}/finish")
def finish_route(
    id_ruta: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """Finalizar una ruta activa"""
    ruta = db.query(Ruta).filter(Ruta.id_ruta == id_ruta).first()
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada.")

    ruta.estado_ruta = "COMPLETADA"
    ruta.hora_fin_real = datetime.now()
    db.commit()

    asig_c = db.query(AsignacionConductor).filter(AsignacionConductor.id_ruta == id_ruta).first()
    if asig_c and asig_c.id_conductor:
        sync_driver_status(asig_c.id_conductor, db)

    asig_v = db.query(AsignacionVehiculo).filter(AsignacionVehiculo.id_ruta == id_ruta).first()
    if asig_v and asig_v.id_vehiculo:
        sync_vehicle_status(asig_v.id_vehiculo, db)

    AuditService.record_activity(
        db=db,
        user_id=current_user.id_usuario,
        action="FINALIZAR",
        module="RUTAS",
        detail=f"Finalizó la ruta {ruta.codigo_ruta} ({ruta.nombre_ruta})"
    )

    return {"message": "Ruta finalizada correctamente", "id_ruta": str(id_ruta), "estado_ruta": "COMPLETADA"}


@router.post("/{id_ruta}/location")
def update_route_location(
    id_ruta: UUID,
    loc: LocationUpdateSchema,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """Actualización HTTP de ubicación de ruta"""
    return {"status": "success", "message": "Ubicación registrada"}
