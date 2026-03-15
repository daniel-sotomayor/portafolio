from rest_framework import serializers
from django.conf import settings
from .models import Perfil


def get_full_media_url(obj, field_name):
    """Función helper para obtener URL completa de archivo"""
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


class PerfilSerializer(serializers.ModelSerializer):
    """
    Serializer para el perfil del portafolio
    """
    # Campos personalizados para garantizar URLs completas
    foto_perfil_url = serializers.SerializerMethodField()
    cv_pdf_url = serializers.SerializerMethodField()
    meta_imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Perfil
        fields = [
            'id', 'usuario', 'nombre_completo', 'titulo_profesional',
            'bio_corta', 'bio_larga', 'email', 'telefono', 'ubicacion',
            'foto_perfil', 'foto_perfil_url', 'cv_pdf', 'cv_pdf_url', 'redes_sociales',
            'color_primario', 'color_secundario', 'color_oscuro', 'color_claro',
            'meta_titulo', 'meta_descripcion', 'meta_imagen', 'meta_imagen_url',
            'activo', 'creado', 'actualizado'
        ]
        read_only_fields = ['id', 'creado', 'actualizado']
    
    def get_foto_perfil_url(self, obj):
        """Retorna la URL completa de la foto de perfil"""
        return get_full_media_url(obj, 'foto_perfil')
    
    def get_cv_pdf_url(self, obj):
        """Retorna la URL completa del CV PDF"""
        return get_full_media_url(obj, 'cv_pdf')
    
    def get_meta_imagen_url(self, obj):
        """Retorna la URL completa de la imagen meta"""
        return get_full_media_url(obj, 'meta_imagen')


class PerfilPublicSerializer(serializers.ModelSerializer):
    """
    Serializer público para el perfil (sin datos sensibles)
    """
    # Campos personalizados para garantizar URLs completas
    foto_perfil_url = serializers.SerializerMethodField()
    cv_pdf_url = serializers.SerializerMethodField()
    meta_imagen_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Perfil
        fields = [
            'nombre_completo', 'titulo_profesional', 'bio_corta',
            'bio_larga', 'email', 'telefono', 'ubicacion', 
            'foto_perfil', 'foto_perfil_url', 'cv_pdf', 'cv_pdf_url', 'redes_sociales',
            'color_primario', 'color_secundario', 'color_oscuro', 'color_claro',
            'meta_titulo', 'meta_descripcion', 'meta_imagen', 'meta_imagen_url'
        ]
    
    def get_foto_perfil_url(self, obj):
        """Retorna la URL completa de la foto de perfil"""
        return get_full_media_url(obj, 'foto_perfil')
    
    def get_cv_pdf_url(self, obj):
        """Retorna la URL completa del CV PDF"""
        return get_full_media_url(obj, 'cv_pdf')
    
    def get_meta_imagen_url(self, obj):
        """Retorna la URL completa de la imagen meta"""
        return get_full_media_url(obj, 'meta_imagen')
