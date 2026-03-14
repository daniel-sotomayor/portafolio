from django.contrib.auth.models import AbstractUser
from django.db import models


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
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return self.username
