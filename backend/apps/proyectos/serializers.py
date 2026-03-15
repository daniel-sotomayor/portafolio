"""
Serializers de Proyectos
=======================

Este módulo define los serializadores para la API de proyectos.
Convierte los modelos de Django a formato JSON para la API.

Autor: Daniel Sotomayor
Fecha de creación: 2024
"""

from rest_framework import serializers
from .models import Proyecto, CategoriaProyecto


class CategoriaProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProyecto
        fields = ['id', 'nombre', 'slug', 'descripcion', 'color']


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
        if obj.imagen:
            return obj.imagen.url
        return None


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
        if obj.imagen:
            return obj.imagen.url
        return None
