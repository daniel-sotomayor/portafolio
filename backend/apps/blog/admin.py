from django.contrib import admin
from .models import Articulo, CategoriaBlog


@admin.register(CategoriaBlog)
class CategoriaBlogAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'slug']
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Articulo)
class ArticuloAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'categoria', 'autor', 'publicado', 'featured', 'fecha_publicacion']
    list_filter = ['publicado', 'featured', 'categoria']
    search_fields = ['titulo', 'resumen']
    prepopulated_fields = {'slug': ('titulo',)}
    filter_horizontal = []
