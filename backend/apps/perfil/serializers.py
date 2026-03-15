from rest_framework import serializers
from .models import Perfil


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
        if obj.foto_perfil:
            return obj.foto_perfil.url
        return None
    
    def get_cv_pdf_url(self, obj):
        """Retorna la URL completa del CV PDF"""
        if obj.cv_pdf:
            return obj.cv_pdf.url
        return None
    
    def get_meta_imagen_url(self, obj):
        """Retorna la URL completa de la imagen meta"""
        if obj.meta_imagen:
            return obj.meta_imagen.url
        return None


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
        if obj.foto_perfil:
            return obj.foto_perfil.url
        return None
    
    def get_cv_pdf_url(self, obj):
        """Retorna la URL completa del CV PDF"""
        if obj.cv_pdf:
            return obj.cv_pdf.url
        return None
    
    def get_meta_imagen_url(self, obj):
        """Retorna la URL completa de la imagen meta"""
        if obj.meta_imagen:
            return obj.meta_imagen.url
        return None
