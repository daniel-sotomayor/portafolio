"""
Modelos de Proyectos
====================

Este módulo define los modelos de datos para la aplicación de proyectos.
Proporciona estructuras para proyectos y categorías de proyectos.

Autor: Daniel Sotomayor
Fecha de creación: 2024
"""

from django.db import models


class CategoriaProyecto(models.Model):
    """Categoría para clasificar proyectos"""
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    descripcion = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#6366f1')
    
    class Meta:
        verbose_name = 'Categoría de Proyecto'
        verbose_name_plural = 'Categorías de Proyectos'
    
    def __str__(self):
        return self.nombre


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
    
    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['-destacado', '-orden', '-fecha_inicio']
    
    def __str__(self):
        return self.titulo
