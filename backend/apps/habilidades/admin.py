from django.contrib import admin
from .models import Habilidad, CategoriaHabilidad


@admin.register(CategoriaHabilidad)
class CategoriaHabilidadAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'icono', 'orden']
    ordering = ['orden']


@admin.register(Habilidad)
class HabilidadAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'nivel', 'anios_experiencia', 'orden']
    list_filter = ['categoria']
    ordering = ['categoria', '-nivel', 'orden']
