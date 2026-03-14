from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

Usuario = get_user_model()


class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para ver los datos del usuario
    """
    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'avatar', 'bio', 'telefono', 'fecha_nacimiento',
            'pais', 'ciudad', 'github_url', 'linkedin_url',
            'twitter_url', 'instagram_url', 'website_url',
            'is_admin_portafolio', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']


class UsuarioCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para crear un nuevo usuario
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Usuario
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = Usuario.objects.create_user(**validated_data)
        return user


class UsuarioUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para actualizar datos del usuario
    """
    class Meta:
        model = Usuario
        fields = [
            'first_name', 'last_name', 'email', 'avatar',
            'bio', 'telefono', 'fecha_nacimiento', 'pais', 'ciudad',
            'github_url', 'linkedin_url', 'twitter_url',
            'instagram_url', 'website_url'
        ]


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer para cambiar contraseña
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({"new_password": "Las contraseñas no coinciden"})
        return attrs
