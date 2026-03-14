from rest_framework import serializers
from .models import Experiencia, Educacion


class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = [
            'id', 'empresa', 'cargo', 'descripcion', 'logo',
            'ubicacion', 'url_empresa', 'fecha_inicio',
            'fecha_fin', 'actual', 'orden'
        ]


class EducacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educacion
        fields = [
            'id', 'institucion', 'titulo', 'campo_estudio',
            'descripcion', 'logo', 'fecha_inicio',
            'fecha_fin', 'actual', 'orden'
        ]
