from django.db import models


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
    
    class Meta:
        verbose_name = 'Experiencia'
        verbose_name_plural = 'Experiencias'
        ordering = ['-actual', '-fecha_inicio', '-orden']
    
    def __str__(self):
        return f"{self.cargo} en {self.empresa}"


class Educacion(models.Model):
    """Modelo para educación"""
    institucion = models.CharField(max_length=200)
    titulo = models.CharField(max_length=200)
    campo_estudio = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    logo = models.ImageField(upload_to='educacion/logos/', blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    actual = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = 'Educación'
        verbose_name_plural = 'Educaciones'
        ordering = ['-actual', '-fecha_inicio', '-orden']
    
    def __str__(self):
        return f"{self.titulo} en {self.institucion}"
