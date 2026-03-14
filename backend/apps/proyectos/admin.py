from django.contrib import admin
from .models import Proyecto, CategoriaProyecto


@admin.register(CategoriaProyecto)
class CategoriaProyectoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'slug', 'color']
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'destacado', 'en_progreso', 'publicado', 'orden']
    list_filter = ['destacado', 'publicado', 'categorias', 'en_progreso']
    search_fields = ['titulo', 'descripcion_corta']
    prepopulated_fields = {'slug': ('titulo',)}
    filter_horizontal = ['categorias']
    fieldsets = (
        ('Básico', {
            'fields': ('titulo', 'slug', 'descripcion_corta', 'descripcion_larga', 'imagen')
        }),
        ('Categorías', {
            'fields': ('categorias',)
        }),
        ('Enlaces', {
            'fields': ('url_demo', 'url_codigo', 'url_documentacion')
        }),
        ('Técnico', {
            'fields': ('tecnologias', 'caracteristicas')
        }),
        ('Fechas', {
            'fields': ('fecha_inicio', 'fecha_fin', 'en_progreso')
        }),
        ('Visibilidad', {
            'fields': ('destacado', 'orden', 'publicado')
        }),
    )
