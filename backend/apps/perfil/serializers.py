from rest_framework import serializers
from django.conf import settings
from .models import Perfil


def get_full_media_url(obj, field_name):
    field = getattr(obj, field_name, None)
    if field and field.name:
        return f"{settings.SERVER_URL}{field.url}"
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
        request = self.context.get('request')
        if obj.foto_perfil and obj.foto_perfil.name:
            return request.build_absolute_uri(obj.foto_perfil.url) if request else get_full_media_url(obj, 'foto_perfil')
        return None
    
    def get_cv_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.cv_pdf and obj.cv_pdf.name:
            return request.build_absolute_uri(obj.cv_pdf.url) if request else get_full_media_url(obj, 'cv_pdf')
        return None
    
    def get_meta_imagen_url(self, obj):
        request = self.context.get('request')
        if obj.meta_imagen and obj.meta_imagen.name:
            return request.build_absolute_uri(obj.meta_imagen.url) if request else get_full_media_url(obj, 'meta_imagen')
        return None


class PerfilPublicSerializer(serializers.ModelSerializer):
    """
    Serializer público para el perfil (sin datos sensibles)
    """
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
        request = self.context.get('request')
        if obj.foto_perfil and obj.foto_perfil.name:
            return request.build_absolute_uri(obj.foto_perfil.url) if request else get_full_media_url(obj, 'foto_perfil')
        return None
    
    def get_cv_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.cv_pdf and obj.cv_pdf.name:
            return request.build_absolute_uri(obj.cv_pdf.url) if request else get_full_media_url(obj, 'cv_pdf')
        return None
    
    def get_meta_imagen_url(self, obj):
        request = self.context.get('request')
        if obj.meta_imagen and obj.meta_imagen.name:
            return request.build_absolute_uri(obj.meta_imagen.url) if request else get_full_media_url(obj, 'meta_imagen')
        return None
