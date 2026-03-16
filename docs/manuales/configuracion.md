# ⚙️ Manual de Configuración

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-16

---

## 🔧 Configuración del Backend

### Estructura de Settings

El archivo principal de configuración se encuentra en [`backend/portafolio/settings.py`](../../backend/portafolio/settings.py).

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `SECRET_KEY` | Clave secreta de Django | `django-insecure-development-key...` |
| `DEBUG` | Modo de depuración | `True` |
| `ALLOWED_HOSTS` | Hosts permitidos | `localhost,127.0.0.1` |
| `SERVER_URL` | URL del servidor | `http://localhost:8000` |
| `DB_ENGINE` | Motor de base de datos | `django.db.backends.sqlite3` |
| `DB_NAME` | Nombre de la base de datos | `db.sqlite3` |
| `DB_USER` | Usuario de base de datos | - |
| `DB_PASSWORD` | Contraseña de base de datos | - |
| `DB_HOST` | Host de base de datos | `localhost` |
| `DB_PORT` | Puerto de base de datos | `5432` |
| `CORS_ALLOWED_ORIGINS` | Orígenes CORS | `localhost:5173,localhost:3000` |

### Aplicaciones Instaladas

```python
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'ckeditor',
    'storages',
    
    # Local apps
    'apps.usuarios',
    'apps.perfil',
    'apps.proyectos',
    'apps.experiencia',
    'apps.habilidades',
    'apps.blog',
    'apps.contacto',
]
```

---

## 🔐 Configuración de JWT

### Configuración de Simple JWT

```python
SIMPLE_JWT = {
    # Tiempo de vida del token de acceso
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    
    # Tiempo de vida del token de refresco
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    
    # Rotar tokens de refresco automáticamente
    'ROTATE_REFRESH_TOKENS': True,
    
    # Agregar tokens usados a la lista negra
    'BLACKLIST_AFTER_ROTATION': True,
    
    # Algoritmo de firma
    'ALGORITHM': 'HS256',
    
    # Tipo de header de autorización
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### Personalizar Tiempos de Token

```python
# Para desarrollo
'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
'REFRESH_TOKEN_LIFETIME': timedelta(days=30),

# Para producción (más seguro)
'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
```

---

## 🎨 Configuración del Frontend

### Variables de Entorno

```env
# ===========================================
# CONFIGURACIÓN DEL SITIO
# ===========================================

# Nombre del sitio
VITE_SITE_NAME=Mi Portafolio

# Información del propietario
VITE_OWNER_NAME=Juan Pérez
VITE_OWNER_TITLE=Desarrollador Full Stack
VITE_CONTACT_EMAIL=juan@ejemplo.com
VITE_CONTACT_PHONE=+58 412 1234567
VITE_LOCATION=Caracas, Venezuela

# Estadísticas
VITE_YEARS_EXPERIENCE=5
VITE_PROJECTS_COMPLETED=20

# ===========================================
# CONFIGURACIÓN DE LA API
# ===========================================

# URL base de la API
VITE_API_URL=http://localhost:8000
VITE_API_CONTACT_ENDPOINT=/contacto/

# ===========================================
# REDES SOCIALES
# ===========================================

VITE_GITHUB_URL=https://github.com/juanperez
VITE_LINKEDIN_URL=https://linkedin.com/in/juanperez
VITE_TWITTER_URL=https://twitter.com/juanperez
```

### Archivo de Configuración del Sitio

ubicación: `frontend/src/config/site.ts`

```typescript
export interface SiteConfig {
  siteName: string
  ownerName: string
  ownerTitle: string
  email: string
  phone: string
  location: string
  experience: string
  projectsCompleted: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  api: {
    baseUrl: string
    contactEndpoint: string
  }
}
```

---

## 🎨 Personalización de Colores

### Backend (Modelo Perfil)

Los colores se configuran en el modelo [`Perfil`](../../backend/models/perfil.md):

```python
# Configuración de colores en el modelo Perfil
color_primario = '#6366f1'    # Indigo - Color principal
color_secundario = '#ec4899'  # Pink - Color de acento
color_oscuro = '#0f172a'      # Slate 900 - Fondo oscuro
color_claro = '#f8fafc'      # Slate 50 - Fondo claro
```

### Frontend (Tailwind CSS)

ubicación: `frontend/tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          50: '#fdf2f8',
          500: '#ec4899',
          600: '#db2777',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a',
        },
      },
    },
  },
}
```

---

## 📧 Configuración de Email

### Configuración SMTP

```python
# settings.py

# Backend de email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Servidor SMTP
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# Credenciales
EMAIL_HOST_USER = 'tu@email.com'
EMAIL_HOST_PASSWORD = 'tu_app_password'

# Configuración adicional
DEFAULT_FROM_EMAIL = 'Tu Nombre <tu@email.com>'
EMAIL_TIMEOUT = 30
```

### Configuración para Gmail

> **Nota:** Para Gmail, necesitas usar una "App Password" en lugar de tu contraseña normal.

1. Habilita la verificación en 2 pasos en tu cuenta de Google
2. Ve a Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones
3. Genera una nueva contraseña de aplicación
4. Usa esa contraseña en `EMAIL_HOST_PASSWORD`

### Configuración para Otros Servicios

```python
# Outlook/Hotmail
EMAIL_HOST = 'smtp-mail.outlook.com'
EMAIL_PORT = 587

# Yahoo
EMAIL_HOST = 'smtp.mail.yahoo.com'
EMAIL_PORT = 587
```

---

## ☁️ Configuración AWS S3 (Producción)

### Variables de Entorno

```python
# settings.py - descomentar para producción

# AWS Credentials
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = 'tu-bucket-name'
AWS_S3_REGION_NAME = 'us-east-1'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

# Storage Backend
STORAGES = {
    'default': {
        'BACKEND': 'storages.backends.s3boto3.S3Boto3Storage',
    },
    'staticfiles': {
        'BACKEND': 'storages.backends.s3boto3.S3Boto3Storage',
    },
}
```

### Archivos丢 para S3

Los siguientes campos almacenan archivos en S3:
- `Usuario.avatar` - Avatares de usuarios
- `Perfil.foto_perfil` - Fotos de perfil
- `Perfil.cv_pdf` - Currículums PDF
- `Proyecto.imagen` - Imágenes de proyectos
- `Experiencia.logo` - Logos de empresas
- `Articulo.imagen` - Imágenes de artículos

---

## 🔒 Configuración de Seguridad

### Headers de Seguridad (Vite)

ubicación: `frontend/vite.config.ts`

```typescript
export default defineConfig({
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' http://localhost:8000",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    },
  },
})
```

### Configuración CORS

```python
# settings.py

# Orígenes permitidos (separados por coma)
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://tu-dominio.com',
]

# Permitir credenciales
CORS_ALLOW_CREDENTIALS = True

# Métodos permitidos
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Headers permitidos
CORS_ALLOW_HEADERS = [
    'accept',
    'authorization',
    'content-type',
    'x-csrftoken',
]
```

---

## 🗄️ Configuración de Base de Datos

### SQLite (Desarrollo - Por defecto)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### PostgreSQL (Producción)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'portafolio'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
        'CONN_MAX_AGE': 600,
    }
}
```

---

## ⚡ Configuración de Django REST Framework

```python
REST_FRAMEWORK = {
    # Autenticación JWT por defecto
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    
    # Permisos por defecto
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    
    # Paginación
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    
    # Filtros
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    
    # Renderers
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}
```

---

## 📝 Configuración de CKEditor

ubicación: `backend/portafolio/settings.py`

```python
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Full',
        'height': 300,
        'width': '100%',
        'blockedCommands': [],
        'skin': 'moono-lisa',
    },
    'basic': {
        'toolbar': [
            ['Bold', 'Italic', 'Underline'],
            ['NumberedList', 'BulletedList'],
            ['Link', 'Unlink'],
            ['Source'],
        ],
    },
}
```

---

*¿Necesitas más ayuda? Consulta la documentación de API o contacta al desarrollador.*
