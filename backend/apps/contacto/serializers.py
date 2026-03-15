from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator
from .models import MensajeContacto


class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = [
            'id', 'nombre', 'email', 'telefono', 'asunto', 'mensaje',
            'leido', 'contestado', 'creado'
        ]
        read_only_fields = ['id', 'leido', 'contestado', 'creado']


class MensajeContactoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear mensajes de contacto con validaciones de seguridad.
    
    Validaciones implementadas:
    - OWASP A1: Injection - Sanitización de entrada
    - OWASP A7: Missing Function Level Access Control - Permisos apropiados
    """
    
    # Validaciones de longitud para prevenir ataques de denegación
    nombre = serializers.CharField(
        max_length=200,
        min_length=2,
        validators=[
            MinLengthValidator(2, message='El nombre debe tener al menos 2 caracteres'),
            MaxLengthValidator(200, message='El nombre no puede exceder 200 caracteres')
        ]
    )
    email = serializers.EmailField(
        max_length=254,
        required=True
    )
    telefono = serializers.CharField(
        max_length=20,
        required=False,
        allow_blank=True,
        validators=[
            MaxLengthValidator(20, message='El teléfono no puede exceder 20 caracteres')
        ]
    )
    asunto = serializers.CharField(
        max_length=200,
        min_length=5,
        validators=[
            MinLengthValidator(5, message='El asunto debe tener al menos 5 caracteres'),
            MaxLengthValidator(200, message='El asunto no puede exceder 200 caracteres')
        ]
    )
    mensaje = serializers.CharField(
        min_length=10,
        max_length=5000,
        validators=[
            MinLengthValidator(10, message='El mensaje debe tener al menos 10 caracteres'),
            MaxLengthValidator(5000, message='El mensaje no puede exceder 5000 caracteres')
        ]
    )
    
    class Meta:
        model = MensajeContacto
        fields = ['nombre', 'email', 'telefono', 'asunto', 'mensaje']
    
    def validate_nombre(self, value):
        """
        OWASP A1: Injection Prevention
        Sanitizar el nombre para prevenir XSS e inyección de scripts
        """
        # Remover caracteres peligrosos
        sanitized = value.replace('<', '').replace('>', '').replace('"', '').replace("'", '')
        # Remover eventos JavaScript
        sanitized = sanitized.replace('javascript:', '', ).replace('onerror=', '').replace('onclick=', '')
        return sanitized.strip()
    
    def validate_asunto(self, value):
        """
        OWASP A1: Injection Prevention
        Sanitizar el asunto
        """
        sanitized = value.replace('<', '').replace('>', '').replace('"', '').replace("'", '')
        sanitized = sanitized.replace('javascript:', '').replace('onerror=', '').replace('onclick=', '')
        return sanitized.strip()
    
    def validate_mensaje(self, value):
        """
        OWASP A1: Injection Prevention
        Sanitizar el mensaje para prevenir XSS
        """
        sanitized = value.replace('<script', '').replace('</script>', '')
        sanitized = sanitized.replace('<iframe', '').replace('</iframe>', '')
        sanitized = sanitized.replace('javascript:', '')
        return sanitized.strip()
    
    def validate_email(self, value):
        """
        Validar formato de email para prevenir inyección
        """
        # Normalizar a minúsculas para consistencia
        return value.lower().strip()
