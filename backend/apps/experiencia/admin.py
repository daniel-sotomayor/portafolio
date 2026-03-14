from django.contrib import admin
from .models import Experiencia, Educacion


@admin.register(Experiencia)
class ExperienciaAdmin(admin.ModelAdmin):
    list_display = ['cargo', 'empresa', 'actual', 'orden']
    list_filter = ['actual']
    ordering = ['-orden', '-fecha_inicio']


@admin.register(Educacion)
class EducacionAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'institucion', 'actual', 'orden']
    list_filter = ['actual']
    ordering = ['-orden', '-fecha_inicio']
