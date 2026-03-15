"""
Serializers de Proyectos
=======================

Este módulo define los serializadores para la API de proyectos.
Convierte los modelos de Django a formato JSON para la API.

Autor: Daniel Sotomayor
Fecha de creación: 2024
"""

from rest_framework import serializers
from django.conf import settings
from .models import Proyecto, CategoriaProyecto


class CategoriaProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProyecto
        fields = ['id', 'nombre', 'slug', 'descripcion', 'color']


def get_full_media_url(obj, field_name):
    """Función helper para obtener URL completa de imagen"""
    field = getattr(obj, field_name, None)
    if field and field.name:
        # Intentar obtener del request primero
        try:
            request = getattr(obj, '_request', None)
            if request:
                return request.build_absolute_uri(field.url)
        except Exception:
            pass
        # Fallback: usar SERVER_URL configurado
        return f"{settings.SERVER_URL}{settings.MEDIA_URL}{field.name}"
    return None


class ProyectoSerializer(serializers.ModelSerializer):
    categorias = CategoriaProyectoSerializer(many=True, read_only=True)
    categoria_ids = serializers.PrimaryKeyRelatedField(
        queryset=CategoriaProyecto.objects.all(),
        many=True,
        write_only=True,
        required=False
    )
    # Campo personalizado para garantizar URL completa de imagen
    imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Proyecto
        fields = [
            'id', 'titulo', 'slug', 'descripcion_corta', 'descripcion_larga',
            'imagen', 'imagen_url', 'categorias', 'categoria_ids',
            'url_demo', 'url_codigo', 'url_documentacion',
            'tecnologias', 'caracteristicas',
            'fecha_inicio', 'fecha_fin', 'en_progreso',
            'destacado', 'orden', 'publicado',
            'creado', 'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']
    
    def get_imagen_url(self, obj):
        """Retorna la URL completa de la imagen"""
        return get_full_media_url(obj, 'imagen')


class ProyectoListSerializer(serializers.ModelSerializer):
    categorias = CategoriaProyectoSerializer(many=True, read_only=True)
    # Campo personalizado para garantizar URL completa de imagen
    imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Proyecto
        fields = [
            'id', 'titulo', 'slug', 'descripcion_corta', 'imagen', 'imagen_url',
            'categorias', 'tecnologias', 'fecha_inicio',
            'en_progreso', 'destacado'
        ]
    
    def get_imagen_url(self, obj):
        """Retorna la URL completa de la imagen"""
        return get_full_media_url(obj, 'imagen')
