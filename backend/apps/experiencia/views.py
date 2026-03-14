from rest_framework import viewsets, permissions
from .models import Experiencia, Educacion
from .serializers import ExperienciaSerializer, EducacionSerializer


class ExperienciaViewSet(viewsets.ModelViewSet):
    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer
    ordering_fields = ['fecha_inicio', 'orden']
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class EducacionViewSet(viewsets.ModelViewSet):
    queryset = Educacion.objects.all()
    serializer_class = EducacionSerializer
    ordering_fields = ['fecha_inicio', 'orden']
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
