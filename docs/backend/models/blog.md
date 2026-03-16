# 📝 Modelos: Blog

> **App:** `apps.blog`  
> **Archivo:** `backend/apps/blog/models.py`  
> **Última Actualización:** 2026-03-16

---

## 📋 Descripción

El modelo `Articulo` representa los artículos del blog del portafolio.

---

## 🏗️ CategoriaBlog

```python
class CategoriaBlog(models.Model):
    """Categoría para artículos del blog"""
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    descripcion = models.TextField(blank=True)
```

---

## 🏗️ Articulo

```python
class Articulo(models.Model):
    """Modelo para artículos del blog"""
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    resumen = models.CharField(max_length=300)
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='blog/')
    categoria = models.ForeignKey(
        CategoriaBlog,
        on_delete=models.SET_NULL,
        null=True,
        related_name='articulos'
    )
    autor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='articulos'
    )
    etiquetas = models.JSONField(default=list)
    
    # SEO
    meta_titulo = models.CharField(max_length=60, blank=True)
    meta_descripcion = models.CharField(max_length=160, blank=True)
    
    # Estado
    publicado = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    
    # Fechas
    fecha_publicacion = models.DateTimeField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | CharField(200) | Título del artículo |
| `slug` | SlugField | URL amigable |
| `resumen` | CharField(300) | Resumen del artículo |
| `contenido` | TextField | Contenido completo |
| `imagen` | ImageField | Imagen del artículo |
| `categoria` | ForeignKey | Categoría del artículo |
| `autor` | ForeignKey | Autor del artículo |
| `etiquetas` | JSONField | Etiquetas del artículo |
| `meta_titulo` | CharField(60) | Meta título SEO |
| `meta_descripcion` | CharField(160) | Meta descripción SEO |
| `publicado` | BooleanField | ¿Publicado? |
| `featured` | BooleanField | ¿Destacado? |
| `fecha_publicacion` | DateTimeField | Fecha de publicación |

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "titulo": "Cómo crear un portafolio profesional",
  "slug": "como-crear-portafolio-profesional",
  "resumen": "Guía completa para crear un portafolio que impresione...",
  "contenido": "<p>Contenido del artículo...</p>",
  "imagen": "/media/blog/portafolio-thumb.jpg",
  "categoria": 1,
  "autor": 1,
  "etiquetas": ["portafolio", "desarrollo-web", "career"],
  "meta_titulo": "Cómo crear un portafolio profesional | Blog",
  "meta_descripcion": "Aprende a crear un portafolio que impresione...",
  "publicado": true,
  "featured": true,
  "fecha_publicacion": "2024-06-15T10:00:00Z"
}
```
