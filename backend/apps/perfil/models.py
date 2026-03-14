from django.db import models
from django.conf import settings


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
    
    class Meta:
        verbose_name = 'Perfil'
        verbose_name_plural = 'Perfiles'
    
    def __str__(self):
        return self.nombre_completo
