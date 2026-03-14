from django.db import models
from django.conf import settings


class CategoriaBlog(models.Model):
    """Categoría para artículos del blog"""
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    descripcion = models.TextField(blank=True)
    
    class Meta:
        verbose_name = 'Categoría de Blog'
        verbose_name_plural = 'Categorías de Blog'
    
    def __str__(self):
        return self.nombre


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
    
    class Meta:
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'
        ordering = ['-fecha_publicacion']
    
    def __str__(self):
        return self.titulo
