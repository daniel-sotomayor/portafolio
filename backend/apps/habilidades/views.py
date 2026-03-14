from rest_framework import viewsets, permissions
from .models import Habilidad, CategoriaHabilidad
from .serializers import HabilidadSerializer, CategoriaHabilidadSerializer


class HabilidadViewSet(viewsets.ModelViewSet):
    queryset = Habilidad.objects.all()
    serializer_class = HabilidadSerializer
    filter_fields = ['categoria', 'nivel']
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class CategoriaHabilidadViewSet(viewsets.ModelViewSet):
    queryset = CategoriaHabilidad.objects.all()
    serializer_class = CategoriaHabilidadSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
