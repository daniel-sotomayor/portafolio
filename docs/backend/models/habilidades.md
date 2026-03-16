# 🛠️ Modelos: Habilidades

> **App:** `apps.habilidades`  
> **Archivo:** `backend/apps/habilidades/models.py`  
> **Última Actualización:** 2026-03-16

---

## 📋 Descripción

El modelo `Habilidad` representa las habilidades técnicas y blandas del profesional, organizadas por categorías.

---

## 🏗️ CategoriaHabilidad

```python
class CategoriaHabilidad(models.Model):
    """Categoría para agrupar habilidades"""
    nombre = models.CharField(max_length=100)
    icono = models.CharField(max_length=50, blank=True)
    orden = models.IntegerField(default=0)
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | CharField(100) | Nombre de la categoría |
| `icono` | CharField(50) | Icono de la categoría |
| `orden` | IntegerField | Orden de visualización |

---

## 🛠️ Habilidad

```python
class Habilidad(models.Model):
    """Modelo para habilidades técnicas y blandas"""
    nombre = models.CharField(max_length=100)
    icono = models.CharField(max_length=50, blank=True)
    categoria = models.ForeignKey(
        CategoriaHabilidad,
        on_delete=models.CASCADE,
        related_name='habilidades'
    )
    nivel = models.IntegerField(default=50)  # 0-100
    descripcion = models.TextField(blank=True)
    anios_experiencia = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    orden = models.IntegerField(default=0)
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | CharField(100) | Nombre de la habilidad |
| `icono` | CharField(50) | Icono de la habilidad |
| `categoria` | ForeignKey | Categoría relacionada |
| `nivel` | IntegerField | Nivel (0-100) |
| `descripcion` | TextField | Descripción de la habilidad |
| `anios_experiencia` | DecimalField | Años de experiencia |
| `orden` | IntegerField | Orden de visualización |

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "nombre": "Django",
  "icono": "django-icon",
  "categoria": 1,
  "nivel": 90,
  "descripcion": "Framework web de Python",
  "anios_experiencia": 5.0,
  "orden": 1
}
```
