# 📖 Manual de Instalación

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-16

---

## 🚀 Requisitos Previos

| Requisito | Versión Mínima | Notas |
|-----------|----------------|-------|
| Python | 3.10+ | Necesario para Django |
| Node.js | 18+ | Necesario para el frontend |
| Git | 2.0+ | Para clonar el repositorio |
| npm / yarn | latest | Gestor de paquetes de Node |

### Opcionales

| Requisito | Versión Mínima | Notas |
|-----------|----------------|-------|
| PostgreSQL | 14+ | Solo para producción |
| AWS S3 | - | Solo para almacenamiento en producción |

---

## 🛠️ Estructura del Proyecto

```
portafolio/
├── backend/                 # API REST con Django
│   ├── apps/               # Aplicaciones Django
│   │   ├── usuarios/      # Gestión de usuarios
│   │   ├── perfil/        # Perfil público
│   │   ├── proyectos/     # Proyectos del portafolio
│   │   ├── experiencia/   # Experiencia laboral
│   │   ├── habilidades/   # Habilidades técnicas
│   │   ├── blog/          # Artículos del blog
│   │   └── contacto/      # Formulario de contacto
│   ├── portafolio/        # Configuración de Django
│   ├── media/             # Archivos subidos
│   ├── staticfiles/       # Archivos estáticos
│   └── requirements.txt   # Dependencias Python
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/   # Componentes React
    │   ├── pages/        # Páginas
    │   ├── config/       # Configuración
    │   └── services/    # Servicios API
    ├── package.json      # Dependencias Node
    └── vite.config.ts   # Configuración de Vite
```

---

## 🛠️ Instalación del Backend

### 1. Clonar el Repositorio

```bash
git clone https://github.com/daniel-sotomayor/portafolio.git
cd portafolio
```

### 2. Crear y Activar Entorno Virtual

```bash
# En Linux/Mac
python3 -m venv venv
source venv/bin/activate

# En Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Instalar Dependencias

```bash
cd backend
pip install -r requirements.txt
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en `backend/`:

```env
# Django - Seguridad
SECRET_KEY=tu-secret-key-aqui-muy-segura
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos (SQLite por defecto - no necesita configuración)
# Para PostgreSQL en producción:
# DB_ENGINE=django.db.backends.postgresql
# DB_NAME=portafolio_db
# DB_USER=postgres_user
# DB_PASSWORD=tu_password
# DB_HOST=localhost
# DB_PORT=5432

# Email (configuración SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=tu@email.com
EMAIL_HOST_PASSWORD=tu_app_password

# CORS (orígenes permitidos separados por coma)
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 5. Ejecutar Migraciones

```bash
# Crear migraciones (si es necesario)
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate
```

### 6. Recolectar Archivos Estáticos

```bash
python manage.py collectstatic
```

### 7. Crear Super Usuario

```bash
python manage.py createsuperuser
```

Sigue las instrucciones en pantalla para crear tu usuario administrador.

### 8. Iniciar Servidor de Desarrollo

```bash
python manage.py runserver
```

El servidor estará disponible en: `http://localhost:8000`

### 9. Verificar Instalación

| Servicio | URL | Descripción |
|----------|-----|-------------|
| API REST | `http://localhost:8000/api/` | Endpoint base de la API |
| Swagger | `http://localhost:8000/api/docs/` | Documentación interactiva |
| Admin | `http://localhost:8000/admin/` | Panel de administración |

---

## 🎨 Instalación del Frontend

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en `frontend/`:

```env
# API
VITE_API_URL=http://localhost:8000
VITE_API_CONTACT_ENDPOINT=/contacto/

# Información del sitio
VITE_SITE_NAME=Mi Portafolio
VITE_OWNER_NAME=Tu Nombre
VITE_OWNER_TITLE=Desarrollador Full Stack
VITE_CONTACT_EMAIL=tu@email.com
VITE_CONTACT_PHONE=+58 412 1234567
VITE_LOCATION=Caracas, Venezuela

# Redes sociales
VITE_GITHUB_URL=https://github.com/tuusuario
VITE_LINKEDIN_URL=https://linkedin.com/in/tuusuario
VITE_TWITTER_URL=https://twitter.com/tuusuario

# Experiencia y proyectos (para estadísticas)
VITE_YEARS_EXPERIENCE=5
VITE_PROJECTS_COMPLETED=20
```

### 3. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:5173`

### 4. Construir para Producción

```bash
npm run build
```

Los archivos se generarán en `frontend/dist/`

---

## 🐳 Docker (Opcional)

### Dockerfile del Backend

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "portafolio.wsgi:application"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  # Base de datos PostgreSQL
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: portafolio_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Backend Django
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DEBUG=True
      - DB_ENGINE=django.db.backends.postgresql
      - DB_HOST=db
      - DB_NAME=portafolio_db
      - DB_USER=postgres
      - DB_PASSWORD=password
    depends_on:
      - db
    volumes:
      - ./backend:/app
      - media_volume:/app/media

  # Frontend React
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:8000

volumes:
  postgres_data:
  media_volume:
```

### Ejecutar con Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

---

## ⚙️ Configuración de Producción

### Variables de Entorno Obligatorias

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SECRET_KEY` | Clave secreta de Django | `django-insecure-xxx...` |
| `DEBUG` | Modo de depuración | `False` |
| `ALLOWED_HOSTS` | Hosts permitidos | `tu-dominio.com` |
| `CORS_ALLOWED_ORIGINS` | Orígenes CORS | `https://tu-dominio.com` |

### Checklist Pre-Production

- [ ] Configurar `DEBUG=False`
- [ ] Configurar `SECRET_KEY` segura
- [ ] Configurar `ALLOWED_HOSTS` con tu dominio
- [ ] Configurar base de datos PostgreSQL
- [ ] Configurar almacenamiento S3 (opcional)
- [ ] Configurar email SMTP
- [ ] Configurar HTTPS/SSL
- [ ] Ejecutar `python manage.py check --deploy`

---

## ✅ Verificación de la Instalación

### Backend

| Verificación | URL Esperada | Resultado |
|--------------|--------------|-----------|
| API Base | `http://localhost:8000/api/` | JSON response |
| Swagger UI | `http://localhost:8000/api/docs/` | Documentación |
| Admin | `http://localhost:8000/admin/` | Login admin |

### Frontend

| Verificación | URL Esperada | Resultado |
|--------------|--------------|-----------|
| Homepage | `http://localhost:5173` | Página principal |
| Proyectos | `http://localhost:5173/projects` | Listado proyectos |
| Blog | `http://localhost:5173/blog` | Artículos |

---

## 🔧 Solución de Problemas

### Error: "No module named..."

```bash
# Verificar que el entorno virtual está activado
source venv/bin/activate

# Reinstalar dependencias
pip install -r requirements.txt
```

### Error de Permisos en Linux/Mac

```bash
# Si hay problemas con archivos media
chmod -R 755 media/
chown -R $USER:$USER media/
```

### Error de Conexión a la API

```bash
# Verificar que el backend está corriendo
curl http://localhost:8000/api/

# Verificar CORS en settings.py
```

### Error de Node.js

```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstallar
rm -rf node_modules
npm install
```

---

## 📚 Recursos Adicionales

- [Documentación de Django](https://docs.djangoproject.com/)
- [Documentación de DRF](https://www.django-rest-framework.org/)
- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)

---

*¿Necesitas ayuda? Contacta a través del formulario de contacto del portafolio.*
