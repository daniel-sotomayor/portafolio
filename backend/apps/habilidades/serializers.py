from rest_framework import serializers
from .models import Habilidad, CategoriaHabilidad


class CategoriaHabilidadSerializer(serializers.ModelSerializer):
    habilidades = serializers.SerializerMethodField()
    
    class Meta:
        model = CategoriaHabilidad
        fields = ['id', 'nombre', 'icono', 'orden', 'habilidades']
    
    def get_habilidades(self, obj):
        return HabilidadSerializer(obj.habilidades.all(), many=True).data


class HabilidadSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    
    class Meta:
        model = Habilidad
        fields = ['id', 'nombre', 'icono', 'categoria', 'categoria_nombre', 'nivel', 'descripcion', 'anios_experiencia', 'orden']
