# 📧 Modelo: Contacto

> **App:** `apps.contacto`  
> **Archivo:** `backend/apps/contacto/models.py`  
> **Última Actualización:** 2026-03-16

---

## 📋 Descripción

El modelo `MensajeContacto` gestiona los mensajes enviados a través del formulario de contacto del portafolio.

---

## 🏗️ MensajeContacto

```python
class MensajeContacto(models.Model):
    """Modelo para mensajes de contacto"""
    nombre = models.CharField(max_length=200)
    email = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    telefono = models.CharField(max_length=20, blank=True)
    
    # Estado
    leido = models.BooleanField(default=False)
    contestado = models.BooleanField(default=False)
    respuesta = models.TextField(blank=True)
    
    # Fechas
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Mensaje de Contacto'
        verbose_name_plural = 'Mensajes de Contacto'
        ordering = ['-creado']
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | CharField(200) | Nombre del remitente |
| `email` | EmailField | Correo del remitente |
| `asunto` | CharField(200) | Asunto del mensaje |
| `mensaje` | TextField | Contenido del mensaje |
| `telefono` | CharField(20) | Teléfono del remitente |
| `leido` | BooleanField | ¿Mensaje leído? |
| `contestado` | BooleanField | ¿Mensaje contestado? |
| `respuesta` | TextField | Respuesta enviada |
| `creado` | DateTimeField | Fecha de creación |
| `actualizado` | DateTimeField | Última actualización |

---

## 📊 Ejemplo de Datos

```json
{
  "id": 1,
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "asunto": "Consulta sobre desarrollo web",
  "mensaje": "Hola, me interesa contratar sus servicios...",
  "telefono": "+58 414 1234567",
  "leido": true,
  "contestado": false,
  "respuesta": "",
  "creado": "2024-06-15T10:00:00Z",
  "actualizado": "2024-06-15T12:00:00Z"
}
```
