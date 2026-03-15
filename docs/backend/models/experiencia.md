# 💼 Modelos: Experiencia y Educación

> **App:** `apps.experiencia`  
> **Archivo:** `backend/apps/experiencia/models.py`  
> **Última Actualización:** 2026-03-15

---

## 📋 Descripción

El modelo `Experiencia` representa la experiencia laboral, mientras que `Educacion` representa la formación académica del profesional.

---

## 🏗️ Experiencia

```python
class Experiencia(models.Model):
    """Modelo para experiencia laboral"""
    empresa = models.CharField(max_length=200)
    cargo = models.CharField(max_length=200)
    descripcion = models.TextField()
    logo = models.ImageField(upload_to='experiencia/logos/', blank=True, null=True)
    ubicacion = models.CharField(max_length=200, blank=True)
    url_empresa = models.URLField(blank=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    actual = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `empresa` | CharField(200) | Nombre de la empresa |
| `cargo` | CharField(200) | Puesto desempeñ |
| `descripcion` | TextField | Descripción del rol |
| `logo` | ImageField | Logo de la empresa |
| `ubicacion` | CharField(200) | Ubicación de la empresa |
| `url_empresa` | URLField | Sitio web de la empresa |
| `fecha_inicio` | DateField | Fecha de inicio |
| `fecha_fin` | DateField | Fecha de finalización |
| `actual` | BooleanField | ¿Es el trabajo actual? |
| `orden` | IntegerField | Orden de visualización |

---

## 🎓 Educación

```python
class Educacion(models.Model):
    """Modelo para educación"""
    institucion = models.CharField(max_length=200)
    titulo = models.CharField(max_length=200)
    campo_estudio = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    logo = models.ImageField(upload_to='educacion/logos/', blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    actual = BooleanField(default=False)
    orden = models.IntegerField(default=0)
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `institucion` | CharField(200) | Nombre de la institución |
| `titulo` | CharField(200) | Título obtenido |
| `campo_estudio` | CharField(200) | Campo de estudio |
| `descripcion` | TextField | Descripción adicional |
| `logo` | ImageField | Logo de la institución |
| `fecha_inicio` | DateField | Fecha de inicio |
| `fecha_fin` | DateField | Fecha de graduación |
| `actual` | BooleanField | ¿Está en curso? |
| `orden` | IntegerField | Orden de visualización |

---

## 📊 Ejemplo de Datos

### Experiencia

```json
{
  "id": 1,
  "empresa": "TechCorp Venezuela",
  "cargo": "Desarrollador Full Stack",
  "descripcion": "Desarrollo de aplicaciones web con Django y React...",
  "logo": "/media/experiencia/logos/techcorp.png",
  "ubicacion": "Caracas, Venezuela",
  "url_empresa": "https://techcorp.com.ve",
  "fecha_inicio": "2022-01-15",
  "fecha_fin": null,
  "actual": true,
  "orden": 1
}
```

### Educación

```json
{
  "id": 1,
  "institucion": "Universidad Simón Bolívar",
  "titulo": "Licenciatura en Computación",
  "campo_estudio": "Ingeniería de Software",
  "descripcion": "Formación en desarrollo de software...",
  "logo": "/media/educacion/logos/usb.png",
  "fecha_inicio": "2015-09-01",
  "fecha_fin": "2020-07-15",
  "actual": false,
  "orden": 1
}
```

---

## 🔍 Consultas

```python
# Experiencias laborales
experiencias = Experiencia.objects.order_by('-actual', '-fecha_inicio')

# Educación
educacion = Educacion.objects.order_by('-actual', '-fecha_inicio')
```
