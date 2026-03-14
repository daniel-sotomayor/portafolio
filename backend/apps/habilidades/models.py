from django.db import models


class CategoriaHabilidad(models.Model):
    """Categoría para agrupar habilidades"""
    nombre = models.CharField(max_length=100)
    icono = models.CharField(max_length=50, blank=True)
    orden = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = 'Categoría de Habilidad'
        verbose_name_plural = 'Categorías de Habilidades'
        ordering = ['orden']
    
    def __str__(self):
        return self.nombre


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
    
    class Meta:
        verbose_name = 'Habilidad'
        verbose_name_plural = 'Habilidades'
        ordering = ['-nivel', 'orden']
    
    def __str__(self):
        return self.nombre
