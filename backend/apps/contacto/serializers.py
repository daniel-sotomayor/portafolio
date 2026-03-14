from rest_framework import serializers
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
    class Meta:
        model = MensajeContacto
        fields = ['nombre', 'email', 'telefono', 'asunto', 'mensaje']
