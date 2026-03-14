from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MensajeContacto
from .serializers import MensajeContactoSerializer, MensajeContactoCreateSerializer


class MensajeContactoViewSet(viewsets.ModelViewSet):
    queryset = MensajeContacto.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return MensajeContactoCreateSerializer
        return MensajeContactoSerializer
    
    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def marcar_leido(self, request, pk=None):
        """Marcar mensaje como leído"""
        mensaje = self.get_object()
        mensaje.leido = True
        mensaje.save()
        return Response({'status': 'Mensaje marcado como leído'})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def marcar_contestado(self, request, pk=None):
        """Marcar mensaje como contestado"""
        mensaje = self.get_object()
        mensaje.contestado = True
        mensaje.save()
        return Response({'status': 'Mensaje marcado como contestado'})
