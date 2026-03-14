from rest_framework import serializers
from .models import Perfil


class PerfilSerializer(serializers.ModelSerializer):
    """
    Serializer para el perfil del portafolio
    """
    class Meta:
        model = Perfil
        fields = [
            'id', 'usuario', 'nombre_completo', 'titulo_profesional',
            'bio_corta', 'bio_larga', 'email', 'telefono', 'ubicacion',
            'foto_perfil', 'cv_pdf', 'redes_sociales',
            'color_primario', 'color_secundario', 'color_oscuro', 'color_claro',
            'meta_titulo', 'meta_descripcion', 'meta_imagen',
            'activo', 'creado', 'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']


class PerfilPublicSerializer(serializers.ModelSerializer):
    """
    Serializer público para el perfil (sin datos sensibles)
    """
    class Meta:
        model = Perfil
        fields = [
            'nombre_completo', 'titulo_profesional', 'bio_corta',
            'bio_larga', 'email', 'telefono', 'ubicacion', 'foto_perfil',
            'cv_pdf', 'redes_sociales',
            'color_primario', 'color_secundario', 'color_oscuro', 'color_claro',
            'meta_titulo', 'meta_descripcion', 'meta_imagen'
        ]
