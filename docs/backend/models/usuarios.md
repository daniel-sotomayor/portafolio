# 👥 Modelo: Usuario

> **App:** `apps.usuarios`  
> **Archivo:** `backend/apps/usuarios/models.py`  
> **Última Actualización:** 2026-03-15

---

## 📋 Descripción

El modelo `Usuario` es una extensión del modelo de usuario de Django (`AbstractUser`) que añade campos personalizados para el portafolio.

---

## 🏗️ Estructura

```python
class Usuario(AbstractUser):
    """
    Modelo de usuario personalizado para el portafolio.
    """
    avatar = models.ImageField(upload_to='usuarios/avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    pais = models.CharField(max_length=100, blank=True)
    ciudad = models.CharField(max_length=100, blank=True)
    
    # Redes sociales
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    
    # Permisos especiales
    is_admin_portafolio = models.BooleanField(default=False)
```

---

## 📝 Campos

### Campos Heredados de AbstractUser

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `username` | CharField | Nombre de usuario único |
| `email` | EmailField | Correo electrónico |
| `first_name` | CharField | Nombre |
| `last_name` | CharField | Apellido |
| `password` | CharField | Contraseña encriptada |
| `is_staff` | BooleanField | Acceso al admin |
| `is_active` | BooleanField | Cuenta activa |
| `is_superuser` | BooleanField | Super usuario |
| `last_login` | DateTimeField | Último inicio de sesión |
| `date_joined` | DateTimeField | Fecha de registro |

### Campos Personalizados

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `avatar` | ImageField | Foto de perfil |
| `bio` | TextField | Biografía |
| `telefono` | CharField(20) | Teléfono |
| `fecha_nacimiento` | DateField | Fecha de nacimiento |
| `pais` | CharField(100) | País |
| `ciudad` | CharField(100) | Ciudad |
| `github_url` | URLField | Enlace GitHub |
| `linkedin_url` | URLField | Enlace LinkedIn |
| `twitter_url` | URLField | Enlace Twitter |
| `instagram_url` | URLField | Enlace Instagram |
| `website_url` | URLField | Sitio web personal |
| `is_admin_portafolio` | BooleanField | Permiso admin del portafolio |

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@ejemplo.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "avatar": "/media/usuarios/avatars/admin.jpg",
  "bio": "Desarrollador Full Stack...",
  "telefono": "+58 412 1234567",
  "fecha_nacimiento": "1995-06-15",
  "pais": "Venezuela",
  "ciudad": "Caracas",
  "github_url": "https://github.com/juanperez",
  "linkedin_url": "https://linkedin.com/in/juanperez",
  "twitter_url": "https://twitter.com/juanperez",
  "instagram_url": "https://instagram.com/juanperez",
  "website_url": "https://juanperez.dev",
  "is_admin_portafolio": true,
  "is_staff": true,
  "is_active": true,
  "date_joined": "2024-01-01T00:00:00Z"
}
```

---

## 🔐 Permisos

### Flags de Permisos

| Flag | Descripción |
|------|-------------|
| `is_staff` | Acceso al panel de admin de Django |
| `is_active` | Cuenta activa puede iniciar sesión |
| `is_superuser` | Acceso completo a todos los recursos |
| `is_admin_portafolio` | Permisos de admin del portafolio |

---

## 🔗 Relaciones

```python
# Relación con Perfil
perfil = usuario.perfil

# Relación con Artículos
articulos = usuario.articulos.all()
```
