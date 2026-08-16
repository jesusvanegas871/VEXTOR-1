import os
import uuid
import datetime
import secrets
import hashlib
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import jwt
from uuid import UUID, uuid4

from database import get_db
import models
import schemas
from email_service import send_password_reset_email

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "vextor_super_secret_key_1234567890!")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 Hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False
    if hashed_password.startswith("$2b$") or hashed_password.startswith("$2a$") or hashed_password.startswith("$2y$"):
        return pwd_context.verify(plain_password, hashed_password)
    # Support pbkdf2 or plain legacy hashes
    if hashed_password.startswith("pbkdf2:sha256:"):
        try:
            parts = hashed_password.split(":")
            if len(parts) == 3:
                salt = parts[1]
                stored_hash = parts[2]
                computed = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt.encode('utf-8'), 100000).hex()
                return computed == stored_hash
        except Exception:
            pass
    return plain_password == hashed_password

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def record_activity(db: Session, id_usuario: UUID, accion: str, descripcion: str, ip_origen: str = "127.0.0.1"):
    try:
        act = models.Actividad(
            id_actividad=uuid4(),
            id_usuario=id_usuario,
            accion=accion,
            modulo="Autenticación",
            descripcion=descripcion,
            ip_origen=ip_origen,
            fecha_actividad=datetime.datetime.now(datetime.timezone.utc)
        )
        db.add(act)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error registrando actividad: {e}")

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.now(datetime.timezone.utc) + expires_delta
    else:
        expire = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user_from_token(token: str, db: Session) -> Optional[models.Usuario]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str: str = payload.get("sub")
        sid_str: str = payload.get("sid")

        if user_id_str is None:
            return None

        user_id = UUID(user_id_str)

        if sid_str:
            sid = UUID(sid_str)
            session_db = db.query(models.SesionUsuario).filter(
                models.SesionUsuario.id_sesion == sid,
                models.SesionUsuario.estado_sesion == "ACTIVA"
            ).first()
            if not session_db:
                return None
            session_db.ultima_actividad = datetime.datetime.now(datetime.timezone.utc)
            db.commit()

        user = db.query(models.Usuario).filter(models.Usuario.id_usuario == user_id).first()
        return user
    except Exception:
        return None

def get_current_user(
    request: Request,
    bearer_token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.Usuario:
    token = bearer_token
    if not token:
        token = request.cookies.get("vextor_auth_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autenticado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_current_user_from_token(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o sesión expirada",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user.estado_usuario != "ACTIVO":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo o suspendido"
        )

    return user

@router.post("/register", response_model=schemas.Usuario, status_code=status.HTTP_201_CREATED)
def register_user(user_in: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    clean_email = user_in.correo.strip().lower()

    existing_user = db.query(models.Usuario).filter(models.Usuario.correo_usuario == clean_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado."
        )

    # Validate password strength
    pwd = user_in.contrasena
    if len(pwd) < 8 or not any(c.isupper() for c in pwd) or not any(c.islower() for c in pwd) or not any(c.isdigit() for c in pwd):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número."
        )

    # Find or default to "Administrador" role
    rol_admin = db.query(models.Rol).filter(models.Rol.nombre_rol == "Administrador").first()
    if not rol_admin:
        rol_admin = db.query(models.Rol).first()
        if not rol_admin:
            rol_admin = models.Rol(
                id_rol=uuid4(),
                nombre_rol="Administrador",
                descripcion_rol="Rol Administrativo principal"
            )
            db.add(rol_admin)
            db.commit()

    hashed_pwd = get_password_hash(pwd)

    names = user_in.nombre.strip().split(" ", 1)
    nombres = names[0]
    apellidos = names[1] if len(names) > 1 else ""

    new_user = models.Usuario(
        id_usuario=uuid4(),
        nombres_usuario=nombres,
        apellidos_usuario=apellidos,
        correo_usuario=clean_email,
        contrasena_hash=hashed_pwd,
        tipo_documento="CC",
        numero_documento=f"REG-{secrets.token_hex(4).upper()}",
        telefono_usuario="+573000000000",
        id_rol=rol_admin.id_rol,
        estado_usuario="ACTIVO",
        fecha_creacion=datetime.datetime.now(datetime.timezone.utc)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    record_activity(
        db=db,
        id_usuario=new_user.id_usuario,
        accion="REGISTRO",
        descripcion=f"Registro exitoso de nuevo usuario: {clean_email}"
    )

    return new_user

@router.post("/login", response_model=schemas.LoginResponse)
def login(login_req: schemas.LoginRequest, request: Request, response: Response, db: Session = Depends(get_db)):
    clean_email = login_req.correo.strip().lower()

    user = db.query(models.Usuario).filter(models.Usuario.correo_usuario == clean_email).first()

    if not user or not verify_password(login_req.contrasena, user.contrasena_hash):
        if user:
            record_activity(
                db=db,
                id_usuario=user.id_usuario,
                accion="LOGIN_FALLIDO",
                descripcion="Intento de inicio de sesión con contraseña incorrecta",
                ip_origen=request.client.host if request.client else "127.0.0.1"
            )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )

    if user.estado_usuario != "ACTIVO":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tu cuenta se encuentra inactiva o suspendida"
        )

    client_ip = request.client.host if request.client else "127.0.0.1"
    user_agent = request.headers.get("user-agent", "Navegador Web")

    new_session = models.SesionUsuario(
        id_sesion=uuid4(),
        id_usuario=user.id_usuario,
        ip_origen=client_ip,
        dispositivo="Web Browser",
        user_agent=user_agent,
        fecha_inicio=datetime.datetime.now(datetime.timezone.utc),
        ultima_actividad=datetime.datetime.now(datetime.timezone.utc),
        estado_sesion="ACTIVA"
    )
    db.add(new_session)
    db.commit()

    access_token = create_access_token(
        data={"sub": str(user.id_usuario), "sid": str(new_session.id_sesion)}
    )

    response.set_cookie(
        key="vextor_auth_token",
        value=access_token,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=60 * 60 * 24
    )

    record_activity(
        db=db,
        id_usuario=user.id_usuario,
        accion="LOGIN_EXITOSO",
        descripcion="Inicio de sesión exitoso en la plataforma",
        ip_origen=client_ip
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario": user
    }

@router.post("/logout")
def logout(response: Response, request: Request, current_user: models.Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    token = request.cookies.get("vextor_auth_token") or request.headers.get("Authorization", "").replace("Bearer ", "")

    if token:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            sid_str = payload.get("sid")
            if sid_str:
                sid = UUID(sid_str)
                session_db = db.query(models.SesionUsuario).filter(models.SesionUsuario.id_sesion == sid).first()
                if session_db:
                    session_db.estado_sesion = "CERRADA"
                    db.commit()
        except Exception:
            pass

    response.delete_cookie(key="vextor_auth_token")

    record_activity(
        db=db,
        id_usuario=current_user.id_usuario,
        accion="LOGOUT",
        descripcion="Cierre de sesión del usuario"
    )

    return {"message": "Sesión cerrada correctamente"}

@router.get("/me", response_model=schemas.Usuario)
def get_me(current_user: models.Usuario = Depends(get_current_user)):
    return current_user

class ForgotPasswordRequest(schemas.BaseSchema):
    correo: str

class VerifyResetTokenRequest(schemas.BaseSchema):
    token: str

class ResetPasswordRequest(schemas.BaseSchema):
    token: str
    nueva_contrasena: str

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    clean_email = req.correo.strip().lower()
    user = db.query(models.Usuario).filter(models.Usuario.correo_usuario == clean_email).first()

    # Generic response to prevent account enumeration
    success_msg = {"message": "Si existe una cuenta asociada a este correo, recibirás instrucciones para restablecer tu contraseña."}

    if not user or user.estado_usuario != "ACTIVO":
        return success_msg

    try:
        raw_token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(raw_token.encode('utf-8')).hexdigest()
        exp_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30)).isoformat()

        user.token_recuperacion = f"{token_hash}|{exp_time}"
        db.commit()

        send_password_reset_email(user.correo_usuario, raw_token)

        user_name = f"{user.nombres_usuario} {user.apellidos_usuario}".strip()
        record_activity(
            db=db,
            id_usuario=user.id_usuario,
            accion="SOLICITUD_RECUPERACION",
            descripcion=f"Solicitud de recuperación de contraseña para {user_name}"
        )
    except Exception as e:
        db.rollback()
        print(f"Error procesando recuperación de contraseña: {e}")

    return success_msg

@router.post("/verify-reset-token")
def verify_reset_token(req: VerifyResetTokenRequest, db: Session = Depends(get_db)):
    if not req.token:
        raise HTTPException(status_code=400, detail="Token no proporcionado.")

    token_hash = hashlib.sha256(req.token.encode('utf-8')).hexdigest()

    users = db.query(models.Usuario).filter(models.Usuario.token_recuperacion.isnot(None)).all()
    target_user = None

    for u in users:
        if u.token_recuperacion and "|" in u.token_recuperacion:
            stored_hash, exp_str = u.token_recuperacion.split("|", 1)
            if stored_hash == token_hash:
                try:
                    exp_date = datetime.datetime.fromisoformat(exp_str)
                    if datetime.datetime.now(datetime.timezone.utc) <= exp_date:
                        target_user = u
                    else:
                        raise HTTPException(status_code=400, detail="El enlace de recuperación ha expirado.")
                except ValueError:
                    raise HTTPException(status_code=400, detail="Token con formato de fecha inválido.")
                break

    if not target_user:
        raise HTTPException(status_code=400, detail="Enlace de recuperación inválido o ya utilizado.")

    return {"message": "Token válido", "correo": target_user.correo_usuario}

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    if not req.token or not req.nueva_contrasena:
        raise HTTPException(status_code=400, detail="Datos incompletos.")

    pwd = req.nueva_contrasena
    if len(pwd) < 8 or not any(c.isupper() for c in pwd) or not any(c.islower() for c in pwd) or not any(c.isdigit() for c in pwd):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número."
        )

    token_hash = hashlib.sha256(req.token.encode('utf-8')).hexdigest()
    users = db.query(models.Usuario).filter(models.Usuario.token_recuperacion.isnot(None)).all()
    target_user = None

    for u in users:
        if u.token_recuperacion and "|" in u.token_recuperacion:
            stored_hash, exp_str = u.token_recuperacion.split("|", 1)
            if stored_hash == token_hash:
                try:
                    exp_date = datetime.datetime.fromisoformat(exp_str)
                    if datetime.datetime.now(datetime.timezone.utc) <= exp_date:
                        target_user = u
                    else:
                        raise HTTPException(status_code=400, detail="El enlace de recuperación ha expirado.")
                except ValueError:
                    raise HTTPException(status_code=400, detail="Formato de token inválido.")
                break

    if not target_user:
        raise HTTPException(status_code=400, detail="Enlace de recuperación inválido o ya utilizado.")

    target_user.contrasena_hash = get_password_hash(pwd)
    target_user.token_recuperacion = None

    # Invalidate all active sessions for this user
    active_sessions = db.query(models.SesionUsuario).filter(
        models.SesionUsuario.id_usuario == target_user.id_usuario,
        models.SesionUsuario.estado_sesion == "ACTIVA"
    ).all()
    for s in active_sessions:
        s.estado_sesion = "REVOCADA"

    db.commit()

    record_activity(
        db=db,
        id_usuario=target_user.id_usuario,
        accion="CAMBIO_CONTRASENA_RECUPERACION",
        descripcion="Contraseña restablecida exitosamente mediante token de recuperación"
    )

    return {"message": "Contraseña actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña."}
