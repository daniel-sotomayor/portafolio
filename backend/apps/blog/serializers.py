from rest_framework import serializers
from .models import Articulo, CategoriaBlog


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
    
    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'resumen', 'contenido', 'imagen',
            'categoria', 'categoria_id', 'autor', 'autor_nombre',
            'etiquetas', 'meta_titulo', 'meta_descripcion',
            'publicado', 'featured', 'fecha_publicacion',
            'creado', 'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']


class ArticuloListSerializer(serializers.ModelSerializer):
    categoria = CategoriaBlogSerializer(read_only=True)
    autor_nombre = serializers.CharField(source='autor.get_full_name', read_only=True)
    
    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'resumen', 'imagen',
            'categoria', 'autor_nombre', 'etiquetas',
            'featured', 'fecha_publicacion'
        ]
