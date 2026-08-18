# 🚀 Guía de Instalación y Despliegue Local de VEXTOR

Esta guía explica paso a paso cómo instalar, configurar y poner en marcha todos los componentes del ecosistema **VEXTOR**:

1. 🛢️ **Base de Datos PostgreSQL en Supabase** (`vextor_bd`)
2. 🗺️ **Motor de Enrutamiento OSRM Propio** (`infra/osrm`)
3. 🐍 **Backend FastAPI** (`vextor_be`)
4. ⚛️ **Frontend React 19 + Vite** (`vextor_fe`)

---

## 📋 1. Requisitos Previos del Sistema

Antes de iniciar, asegúrate de contar con el siguiente software y servicios:

| Herramienta / Servicio | Versión / Requisito | Propósito |
| :--- | :--- | :--- |
| **Node.js** | v20.0.0+ | Entorno de ejecución para React 19 / Vite |
| **pnpm** | v9.0.0+ | Gestor de paquetes de Node.js (`npm i -g pnpm`) |
| **Python** | 3.12+ | Lenguaje de ejecución del servidor backend FastAPI |
| **Cuenta en Supabase** (o PostgreSQL 14+) | Gratuita / Cloud | Base de datos PostgreSQL alojada |
| **Docker Desktop / Docker Engine** | v24.0+ | Contenedor para el servidor OSRM propio |
| **Git** | v2.30+ | Control de versiones |

---

## 🛢️ 2. Paso 1: Configuración de la Base de Datos en Supabase

VEXTOR utiliza **PostgreSQL** con identificadores UUID v4 nativos. La base de datos se gestiona fácilmente desde **Supabase**.

### 2.1 Crear el Proyecto en Supabase

1. Inicia sesión en [Supabase](https://supabase.com/).
2. Haz clic en **New Project**.
3. Asigna un nombre al proyecto (ej. `vextor-db`) y una contraseña segura para el usuario `postgres`.
4. Guarda la contraseña en un lugar seguro.

### 2.2 Ejecutar el Script DDL de Esquema y Datos Semilla

1. En el panel de Supabase, navega a la sección **SQL Editor** (icono de `>/_` en la barra lateral izquierda).
2. Haz clic en **New Query**.
3. Abre el archivo `vextor_bd/vextor_bd.sql` en tu editor local, copia todo su contenido y pégalo en el editor SQL de Supabase.
4. Haz clic en **Run** (o presiona `Ctrl + Enter` / `Cmd + Enter`).
5. Confirma que la ejecución responda sin errores. Este script creará automáticamente todas las tablas, restricciones de integridad referencial, funciones UUID y los datos semilla (roles predefinidos y usuario administrador inicial).

### 2.3 Obtener la Cadena de Conexión (`DATABASE_URL`)

1. En el panel de Supabase, ve a **Project Settings** (icono de engranaje) -> **Database**.
2. Desplázate hasta la sección **Connection string**.
3. Selecciona la pestaña **URI** o **Transaction pooler** (puerto `6543` o `5432`).
4. Copia la URL provista, que tendrá una estructura similar a:
   ```text
   postgresql://postgres.[REF]:[TU_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
5. **Importante:** Para SQLAlchemy con el driver `psycopg3` utilizado en el backend FastAPI, debes anteponer `postgresql+psycopg://` al esquema de la URL:
   ```env
   DATABASE_URL=postgresql+psycopg://postgres.xxxxxx:TU_PASSWORD_AQUI@aws-0-us-west-2.pooler.supabase.com:6543/postgres
   ```

---

## 🗺️ 3. Paso 2: Despliegue del Motor OSRM Propio (Routing)

VEXTOR no depende de APIs de terceros como Google Maps o la demo pública de OSRM. Ejecuta un servidor local de **OSRM (Open Source Routing Machine)** que calcula recorridos reales sobre la red vial de Colombia.

### Opción A: Despliegue Automatizado en Windows (PowerShell)

Si usas Windows con Docker Desktop iniciado:

1. Abre PowerShell como Administrador en la raíz del repositorio.
2. Ejecuta el script automatizado:

```powershell
.\setup-osrm.ps1
```

El script descargará automáticamente el mapa de Colombia desde Geofabrik (`colombia-latest.osm.pbf`), procesará el grafo vial mediante `osrm-extract`, `osrm-partition` y `osrm-customize`, y finalmente levantará el servicio HTTP en el puerto `5000`.

---

### Opción B: Despliegue Manual con Docker Compose (Linux / macOS / Windows)

Si prefieres ejecutar el proceso paso a paso o te encuentras en Linux / macOS:

1. **Asegúrate de que Docker esté iniciado:**
   ```bash
   docker info
   ```

2. **Crea la carpeta de datos para OSRM:**
   ```bash
   mkdir -p infra/osrm/data
   ```

3. **Descarga el mapa viales más reciente de Colombia (Geofabrik):**
   ```bash
   curl -L -o infra/osrm/data/colombia-latest.osm.pbf https://download.geofabrik.de/south-america/colombia-latest.osm.pbf
   ```

4. **Procesa el grafo vial con las herramientas de OSRM:**
   ```bash
   # Extract (Extrae la red vial según perfil de automóviles)
   docker compose -f infra/osrm/docker-compose.yml --profile tools run --rm osrm-tools osrm-extract -p /opt/car.lua /data/colombia-latest.osm.pbf

   # Partition (Particiona el mapa)
   docker compose -f infra/osrm/docker-compose.yml --profile tools run --rm osrm-tools osrm-partition /data/colombia-latest.osrm

   # Customize (Aplica métricas y pesos de vías)
   docker compose -f infra/osrm/docker-compose.yml --profile tools run --rm osrm-tools osrm-customize /data/colombia-latest.osrm
   ```

5. **Levanta el contenedor en segundo plano:**
   ```bash
   docker compose -f infra/osrm/docker-compose.yml up -d osrm
   ```

6. **Verifica la salud del servidor OSRM:**
   ```bash
   curl "http://localhost:5000/route/v1/driving/-74.0721,4.7110;-75.5812,6.2442?overview=false"
   ```
   Debe retornar un JSON con HTTP 200 conteniendo `"code": "Ok"`.

---

## 🐍 4. Paso 3: Configuración y Ejecución del Backend FastAPI

El backend coordina la lógica de negocio, autenticación JWT, WebSockets de rastreo GPS y la adaptación segura del servicio OSRM.

### 4.1 Crear y Activar el Entorno Virtual de Python

Navega al directorio `vextor_be`:

```bash
cd vextor_be
python -m venv venv
```

Activa el entorno virtual:
- **En Linux / macOS:**
  ```bash
  source venv/bin/activate
  ```
- **En Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **En Windows (CMD):**
  ```cmd
  .\venv\Scripts\activate.bat
  ```

### 4.2 Instalar Dependencias

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4.3 Configurar las Variables de Entorno (`.env`)

Crea un archivo `.env` en la carpeta `vextor_be/` (o en la raíz del repositorio, basándote en `.env.example`):

```env
# --- BASE DE DATOS SUPABASE / POSTGRESQL ---
DATABASE_URL=postgresql+psycopg://postgres.xxxxxx:TU_PASSWORD_AQUI@aws-0-us-west-2.pooler.supabase.com:6543/postgres

# --- SEGURIDAD Y JWT ---
JWT_SECRET_KEY=coloca_aqui_una_clave_secreta_super_segura_y_larga

# --- ROUTING OSRM PROPIO ---
OSRM_URL=http://localhost:5000
OSRM_TIMEOUT_SECONDS=10

# --- URL FRONTEND PARA CORS Y RECUPERACIÓN ---
FRONTEND_URL=http://localhost:5173

# --- CONFIGURACIÓN DE CORREO (OPCIONAL PARA DESARROLLO) ---
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_correo@gmail.com
MAIL_PASSWORD=tu_app_password
MAIL_FROM=VEXTOR Fleet <tu_correo@gmail.com>
```

### 4.4 Iniciar el Servidor Backend

```bash
uvicorn main:app --reload --port 8000
```

El backend quedará escuchando en `http://localhost:8000`.

- **Documentación Swagger / OpenAPI:** `http://localhost:8000/docs`
- **Verificación de Salud OSRM:** `http://localhost:8000/api/routing/health`

---

## ⚛️ 5. Paso 4: Configuración y Ejecución del Frontend React 19

El frontend de VEXTOR es una SPA dinámica construida con React 19, Tailwind CSS v4 y Leaflet.

### 5.1 Instalar Dependencias con pnpm

Abre una nueva terminal y navega al directorio `vextor_fe`:

```bash
cd vextor_fe
pnpm install
```

### 5.2 Iniciar Servidor de Desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en la URL: **`http://localhost:5173`**

---

## 🔄 6. Paso 5: Verificación End-to-End (E2E)

Sigue estos pasos para comprobar que la integración entre Frontend, Backend, Supabase y OSRM funciona correctamente:

1. **Abrir el Sistema:**
   Accede a `http://localhost:5173` en tu navegador.

2. **Iniciar Sesión:**
   Utiliza las credenciales de prueba predeterminadas insertadas por `vextor_bd.sql` en Supabase:
   - **Correo:** `admin@vextor.com`
   - **Contraseña:** `Admin123!` (o la clave registrada en tus datos semilla)

3. **Verificar Conexión de OSRM en el Mapa:**
   - Ve al módulo **Rutas** (`/rutas`).
   - Crea una nueva ruta seleccionando un origen (ej. *Bogotá*) y un destino (ej. *Medellín*).
   - El mapa trazará automáticamente la línea azul sobre las carreteras reales de Colombia, mostrando la distancia exacta en km y el tiempo estimado.

4. **Verificar Rastreo GPS y WebSockets:**
   - Asigna la ruta a un conductor.
   - En una ventana privada o dispositivo móvil, inicia sesión como conductor.
   - Presiona **Iniciar Ruta** y verifica que la posición GPS se actualice en tiempo real en la consola del administrador mediante WebSockets (`/ws/tracking`).

---

## 🛠️ 7. Solución de Problemas Comunes (Troubleshooting)

### ❓ 1. Error de conexión a Supabase (`psycopg.OperationalError` / `Connection timed out`)
- Revisa que tu contraseña de la base de datos de Supabase no tenga caracteres especiales no codificados en la URL, o usa URL encoding (ej. `@` -> `%40`).
- Confirma que utilizaste el prefijo `postgresql+psycopg://` en la variable `DATABASE_URL` dentro de `.env`.

### ❓ 2. Error en OSRM (`503 Service Unavailable` o `Cannot connect to OSRM`)
- Asegúrate de que el contenedor Docker `vextor-osrm` esté activo (`docker ps`).
- Revisa la URL `OSRM_URL=http://localhost:5000` en `vextor_be/.env`.

### ❓ 3. Problema de CORS al conectar Frontend y Backend
- Verifica que `FRONTEND_URL` en `vextor_be/.env` coincida exactamente con la URL de Vite (`http://localhost:5173`).

### ❓ 4. El mapa no carga rutas ni polígonos
- Confirma que la respuesta de `http://localhost:8000/api/routing/health` retorne `"status": "available"`.
