from django.contrib import admin
from .models import Perfil


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ['nombre_completo', 'titulo_profesional', 'email', 'activo']
    list_filter = ['activo']
    search_fields = ['nombre_completo', 'titulo_profesional', 'email']
    fieldsets = (
        ('Información personal', {
            'fields': ('usuario', 'nombre_completo', 'titulo_profesional', 'bio_corta', 'bio_larga')
        }),
        ('Contacto', {
            'fields': ('email', 'telefono', 'ubicacion')
        }),
        ('Archivos', {
            'fields': ('foto_perfil', 'cv_pdf')
        }),
        ('Redes sociales', {
            'fields': ('redes_sociales',),
            'classes': ('collapse',)
        }),
        ('Personalización', {
            'fields': ('color_primario', 'color_secundario', 'color_oscuro', 'color_claro')
        }),
        ('SEO', {
            'fields': ('meta_titulo', 'meta_descripcion', 'meta_imagen'),
            'classes': ('collapse',)
        }),
        ('Estado', {
            'fields': ('activo',)
        }),
    )
