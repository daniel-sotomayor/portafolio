from rest_framework import status, viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Usuario
from .serializers import (
    UsuarioSerializer, UsuarioCreateSerializer,
    UsuarioUpdateSerializer, ChangePasswordSerializer
)

Usuario = get_user_model()


class UsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar usuarios
    """
    queryset = Usuario.objects.all()
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UsuarioUpdateSerializer
        return UsuarioSerializer
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'change_password', 'me']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Obtener el usuario actualmente autenticado
        """
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """
        Cambiar la contraseña del usuario autenticado
        """
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response(
                    {'old_password': 'La contraseña actual es incorrecta'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Contraseña actualizada correctamente'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    """
    Vista para registrar nuevos usuarios
    """
    queryset = Usuario.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UsuarioCreateSerializer


class ObtainTokenPairView(TokenObtainPairView):
    """
    Vista para obtener tokens JWT
    """
    permission_classes = [AllowAny]


class RefreshTokenView(TokenRefreshView):
    """
    Vista para refrescar tokens JWT
    """
    permission_classes = [AllowAny]
