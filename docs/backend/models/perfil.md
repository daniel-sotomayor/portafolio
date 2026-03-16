# 👤 Modelo: Perfil

> **App:** `apps.perfil`  
> **Archivo:** `backend/apps/perfil/models.py`  
> **Última Actualización:** 2026-03-16

---

## 📋 Descripción

El modelo `Perfil` representa el perfil principal del portafolio. Contiene información pública del profesional, incluyendo datos de contacto, redes sociales y configuración visual del portafolio.

---

## 🏗️ Estructura del Modelo

```python
class Perfil(models.Model):
    """
    Modelo para el perfil principal del portafolio
    """
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='perfil'
    )
    nombre_completo = models.CharField(max_length=200)
    titulo_profesional = models.CharField(max_length=200)
    bio_corta = models.TextField(max_length=300)
    bio_larga = models.TextField()
    email = models.EmailField()
    telefono = models.CharField(max_length=20, blank=True)
    ubicacion = models.CharField(max_length=200)
    foto_perfil = models.ImageField(upload_to='perfil/', blank=True, null=True)
    cv_pdf = models.FileField(upload_to='perfil/cv/', blank=True, null=True)
    
    # Redes sociales como JSON
    redes_sociales = models.JSONField(default=dict, blank=True)
    
    # Configuración visual del portafolio
    color_primario = models.CharField(max_length=7, default='#6366f1')
    color_secundario = models.CharField(max_length=7, default='#ec4899')
    color_oscuro = models.CharField(max_length=7, default='#0f172a')
    color_claro = models.CharField(max_length=7, default='#f8fafc')
    
    # SEO
    meta_titulo = models.CharField(max_length=60, blank=True)
    meta_descripcion = models.CharField(max_length=160, blank=True)
    meta_imagen = models.ImageField(upload_to='perfil/seo/', blank=True, null=True)
    
    # Estado
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
```

---

## 📝 Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | BigAutoField | Auto | ID único del perfil |
| `usuario` | OneToOneField | ✅ | Relación con Usuario |
| `nombre_completo` | CharField(200) | ✅ | Nombre completo |
| `titulo_profesional` | CharField(200) | ✅ | Título profesional |
| `bio_corta` | TextField(300) | ✅ | Biografía corta |
| `bio_larga` | TextField | ✅ | Biografía completa |
| `email` | EmailField | ✅ | Correo electrónico |
| `telefono` | CharField(20) | ❌ | Número de teléfono |
| `ubicacion` | CharField(200) | ✅ | Ubicación geográfica |
| `foto_perfil` | ImageField | ❌ | Foto de perfil |
| `cv_pdf` | FileField | ❌ | Curriculum en PDF |
| `redes_sociales` | JSONField | ❌ | Redes sociales |
| `color_primario` | CharField(7) | ❌ | Color primario (hex) |
| `color_secundario` | CharField(7) | ❌ | Color secundario (hex) |
| `color_oscuro` | CharField(7) | ❌ | Color oscuro (hex) |
| `color_claro` | CharField(7) | ❌ | Color claro (hex) |
| `meta_titulo` | CharField(60) | ❌ | Meta título SEO |
| `meta_descripcion` | CharField(160) | ❌ | Meta descripción SEO |
| `meta_imagen` | ImageField | ❌ | Imagen para SEO |
| `activo` | BooleanField | ❌ | ¿Perfil activo? |
| `creado` | DateTimeField | Auto | Fecha de creación |
| `actualizado` | DateTimeField | Auto | Última actualización |

---

## 🔗 Relaciones

### Relación con Usuario

```python
usuario = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='perfil'
)
```

Un perfil pertenece a un único usuario.

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "usuario": 1,
  "nombre_completo": "Juan Pérez",
  "titulo_profesional": "Desarrollador Full Stack",
  "bio_corta": "Desarrollador con más de 5 años de experiencia...",
  "bio_larga": "Soy un desarrollador Full Stack especializado en...",
  "email": "juan@ejemplo.com",
  "telefono": "+58 412 1234567",
  "ubicacion": "Caracas, Venezuela",
  "foto_perfil": "/media/perfil/foto.jpg",
  "cv_pdf": "/media/perfil/cv/cv.pdf",
  "redes_sociales": {
    "github": "https://github.com/juanperez",
    "linkedin": "https://linkedin.com/in/juanperez",
    "twitter": "https://twitter.com/juanperez",
    "instagram": "https://instagram.com/juanperez"
  },
  "color_primario": "#6366f1",
  "color_secundario": "#ec4899",
  "color_oscuro": "#0f172a",
  "color_claro": "#f8fafc",
  "meta_titulo": "Juan Pérez - Desarrollador Full Stack",
  "meta_descripcion": "Desarrollador Full Stack con experiencia en Django, React y más...",
  "meta_imagen": "/media/perfil/seo/og-image.jpg",
  "activo": true,
  "creado": "2024-01-01T00:00:00Z",
  "actualizado": "2024-06-15T12:00:00Z"
}
```

---

## 🔍 Consultas Comunes

### Obtener perfil público

```python
perfil = Perfil.objects.filter(activo=True).first()
```

### Obtener perfil por usuario

```python
perfil = usuario.perfil
# o
perfil = Perfil.objects.get(usuario_id=user_id)
```

---

## 📝 Serializers

Ver: [`perfil/serializers`](views/perfil.md)

---

## ⚙️ Configuración Visual

Los colores del portafolio pueden personalizarse:

| Campo | Default | Uso |
|-------|---------|-----|
| `color_primario` | `#6366f1` | Color principal (botones, links) |
| `color_secundario` | `#ec4899` | Acentos |
| `color_oscuro` | `#0f172a` | Fondo oscuro |
| `color_claro` | `#f8fafc` | Fondo claro |

---

## 📝 Admin

El modelo está registrado en el admin de Django para gestión desde el panel administrativo.
