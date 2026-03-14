from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Perfil
from .serializers import PerfilSerializer, PerfilPublicSerializer


class PerfilViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar el perfil del portafolio
    """
    queryset = Perfil.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve' and not self.request.user.is_authenticated:
            return PerfilPublicSerializer
        return PerfilSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    @action(detail=False, methods=['get'])
    def public(self, request):
        """
        Obtener el perfil público
        """
        perfil = Perfil.objects.filter(activo=True).first()
        if not perfil:
            return Response(
                {'detail': 'No hay perfil activo'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = PerfilPublicSerializer(perfil)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Obtener el perfil del usuario autenticado
        """
        try:
            perfil = request.user.perfil
        except Perfil.DoesNotExist:
            return Response(
                {'detail': 'Perfil no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = PerfilSerializer(perfil)
        return Response(serializer.data)
