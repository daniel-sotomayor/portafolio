"""
Serializers del Blog
===================

Este módulo define los serializadores para la API del blog.
Convierte los modelos de Django a formato JSON para la API.

Autor: Daniel Sotomayor
Fecha de creación: 2024
"""

from rest_framework import serializers
from django.conf import settings
from .models import Articulo, CategoriaBlog


def get_full_media_url(obj, field_name):
    """Función helper para obtener URL completa de imagen"""
    field = getattr(obj, field_name, None)
    if field and field.name:
        try:
            request = getattr(obj, '_request', None)
            if request:
                return request.build_absolute_uri(field.url)
        except Exception:
            pass
        return f"{settings.SERVER_URL}{settings.MEDIA_URL}{field.name}"
    return None


class CategoriaBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaBlog
        fields = ['id', 'nombre', 'slug', 'descripcion']


class ArticuloSerializer(serializers.ModelSerializer):
    categoria = CategoriaBlogSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=CategoriaBlog.objects.all(),
        source='categoria',
        write_only=True,
        required=False
    )
    autor_nombre = serializers.CharField(source='autor.get_full_name', read_only=True)
    # Campo personalizado para garantizar URL completa de imagen
    imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'resumen', 'contenido', 'imagen', 'imagen_url',
            'categoria', 'categoria_id', 'autor', 'autor_nombre',
            'etiquetas', 'meta_titulo', 'meta_descripcion',
            'publicado', 'featured', 'fecha_publicacion',
            'creado', 'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']
    
    def get_imagen_url(self, obj):
        """Retorna la URL completa de la imagen"""
        return get_full_media_url(obj, 'imagen')


class ArticuloListSerializer(serializers.ModelSerializer):
    categoria = CategoriaBlogSerializer(read_only=True)
    autor_nombre = serializers.CharField(source='autor.get_full_name', read_only=True)
    # Campo personalizado para garantizar URL completa de imagen
    imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'resumen', 'imagen', 'imagen_url',
            'categoria', 'autor_nombre', 'etiquetas',
            'featured', 'fecha_publicacion'
        ]
    
    def get_imagen_url(self, obj):
        """Retorna la URL completa de la imagen"""
        return get_full_media_url(obj, 'imagen')
