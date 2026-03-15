# ⚙️ Manual de Configuración

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-15

---

## 🔧 Configuración del Backend

### settings.py

```python
# Configuración Principal
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Aplicaciones Instaladas
INSTALLED_APPS = [
    # ... apps de terceros
    # ... apps locales
    'apps.usuarios',
    'apps.perfil',
    'apps.proyectos',
    'apps.experiencia',
    'apps.habilidades',
    'apps.blog',
    'apps.contacto',
]

# Base de Datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

---

## 🔐 Configuración de JWT

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## 🎨 Configuración del Frontend

### Variables de Entorno

```env
# API
VITE_API_URL=http://localhost:8000
VITE_API_CONTACT_ENDPOINT=/contacto/

# Sitio
VITE_SITE_NAME=Mi Portafolio
VITE_OWNER_NAME=Juan Pérez
VITE_OWNER_TITLE=Desarrollador Full Stack
VITE_CONTACT_EMAIL=juan@ejemplo.com
VITE_CONTACT_PHONE=+58 412 1234567
VITE_LOCATION=Caracas, Venezuela

# Redes Sociales
VITE_GITHUB_URL=https://github.com/juanperez
VITE_LINKEDIN_URL=https://linkedin.com/in/juanperez
VITE_TWITTER_URL=https://twitter.com/juanperez
```

---

## 🎨 Personalización de Colores

### Backend (Perfil)

```python
# En el modelo Perfil
color_primario = '#6366f1'   # Indigo
color_secundario = '#ec4899' # Pink
color_oscuro = '#0f172a'     # Slate 900
color_claro = '#f8fafc'      # Slate 50
```

### Frontend (Tailwind)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
      }
    }
  }
}
```

---

## 📧 Configuración de Email

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'tu@email.com'
EMAIL_HOST_PASSWORD = 'tu_app_password'
```

---

## ☁️ Configuración AWS S3

```python
# settings.py
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = 'tu-bucket'
AWS_S3_REGION_NAME = 'us-east-1'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```
