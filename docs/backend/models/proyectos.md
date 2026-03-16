# 📦 Modelo: Proyecto

> **App:** `apps.proyectos`  
> **Archivo:** `backend/apps/proyectos/models.py`  
> **Última Actualización:** 2026-03-16

---

## 📋 Descripción

El modelo `Proyecto` representa los proyectos del portafolio profesional. Cada proyecto puede incluir tecnologías utilizadas, imágenes, enlaces y características técnicas.

---

## 🏗️ Estructura del Modelo

### Clase: `Proyecto`

```python
class Proyecto(models.Model):
    """Modelo para proyectos del portafolio"""
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    descripcion_corta = models.CharField(max_length=300)
    descripcion_larga = models.TextField()
    imagen = models.ImageField(upload_to='proyectos/')
    categorias = models.ManyToManyField(CategoriaProyecto, related_name='proyectos')
    
    # Enlaces
    url_demo = models.URLField(blank=True)
    url_codigo = models.URLField(blank=True)
    url_documentacion = models.URLField(blank=True)
    
    # Características técnicas
    tecnologias = models.JSONField(default=list)
    caracteristicas = models.JSONField(default=list)
    
    # Fechas
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    en_progreso = models.BooleanField(default=False)
    
    # Featured
    destacado = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    
    # Estado
    publicado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
```

---

## 📝 Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | BigAutoField | Auto | ID único del proyecto |
| `titulo` | CharField(200) | ✅ | Título del proyecto |
| `slug` | SlugField | ✅ | URL amigable (único) |
| `descripcion_corta` | CharField(300) | ✅ | Resumen del proyecto |
| `descripcion_larga` | TextField | ✅ | Descripción completa |
| `imagen` | ImageField | ✅ | Imagen principal |
| `categorias` | ManyToManyField | ❌ | Categorías del proyecto |
| `url_demo` | URLField | ❌ | Enlace a demo |
| `url_codigo` | URLField | ❌ | Enlace al código fuente |
| `url_documentacion` | URLField | ❌ | Enlace a documentación |
| `tecnologias` | JSONField | ❌ | Lista de tecnologías |
| `caracteristicas` | JSONField | ❌ | Lista de características |
| `fecha_inicio` | DateField | ✅ | Fecha de inicio |
| `fecha_fin` | DateField | ❌ | Fecha de finalización |
| `en_progreso` | BooleanField | ❌ | ¿Está en progreso? |
| `destacado` | BooleanField | ❌ | ¿Proyecto destacado? |
| `orden` | IntegerField | ❌ | Orden de visualización |
| `publicado` | BooleanField | ❌ | ¿Publicado? |
| `creado` | DateTimeField | Auto | Fecha de creación |
| `actualizado` | DateTimeField | Auto | Última actualización |

---

## 🔗 Relaciones

### Relación con Categorías

```python
categorias = models.ManyToManyField(
    CategoriaProyecto,
    related_name='proyectos'
)
```

Un proyecto puede pertenecer a múltiples categorías.

---

## ⚙️ Opciones del Modelo (Meta)

```python
class Meta:
    verbose_name = 'Proyecto'
    verbose_name_plural = 'Proyectos'
    ordering = ['-destacado', '-orden', '-fecha_inicio']
```

---

## 🔄 Métodos

### `__str__`

```python
def __str__(self):
    return self.titulo
```

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "titulo": "Sistema de Gestión de Tareas",
  "slug": "sistema-gestion-tareas",
  "descripcion_corta": "Aplicación web para gestión de proyectos",
  "descripcion_larga": "Sistema completo de gestión de tareas con...",
  "imagen": "/media/proyectos/tareas-thumb.jpg",
  "categorias": [1, 2],
  "url_demo": "https://tareas.ejemplo.com",
  "url_codigo": "https://github.com/usuario/tareas",
  "tecnologias": ["Django", "React", "PostgreSQL", "Docker"],
  "caracteristicas": [
    "Gestión de usuarios",
    "Board Kanban",
    "Notificaciones email"
  ],
  "fecha_inicio": "2024-01-15",
  "fecha_fin": "2024-06-30",
  "en_progreso": false,
  "destacado": true,
  "orden": 1,
  "publicado": true,
  "creado": "2024-01-15T10:00:00Z",
  "actualizado": "2024-07-01T15:30:00Z"
}
```

---

## 🔍 Consultas Comunes

### Listar proyectos publicados

```python
proyectos = Proyecto.objects.filter(publicado=True)
```

### Proyectos destacados

```python
destacados = Proyecto.objects.filter(
    publicado=True,
    destacado=True
).order_by('-orden')
```

### Proyectos por categoría

```python
categoria = CategoriaProyecto.objects.get(slug='web')
proyectos = categoria.proyectos.filter(publicado=True)
```

### Buscar proyectos

```python
resultados = Proyecto.objects.filter(
    Q(titulo__icontains='django') |
    Q(tecnologias__contains=['django'])
)
```

---

## 📝 Serializer Asociado

Ver: [`proyectos/serializers.md`](../../backend/views/proyectos.md)

---

## 📝 Admin

El modelo está registrado en el admin de Django con las siguientes opciones de configuración.
