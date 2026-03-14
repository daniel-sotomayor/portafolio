from django.db import models


class MensajeContacto(models.Model):
    """Modelo para mensajes de contacto"""
    nombre = models.CharField(max_length=200)
    email = models.EmailField()
    telefono = models.CharField(max_length=20, blank=True)
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    
    # Estado
    leido = models.BooleanField(default=False)
    contestado = models.BooleanField(default=False)
    
    # Fechas
    creado = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Mensaje de Contacto'
        verbose_name_plural = 'Mensajes de Contacto'
        ordering = ['-creado']
    
    def __str__(self):
        return f"{self.nombre} - {self.asunto}"
