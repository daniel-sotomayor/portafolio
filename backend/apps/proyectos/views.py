from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Proyecto, CategoriaProyecto
from .serializers import ProyectoSerializer, ProyectoListSerializer, CategoriaProyectoSerializer


class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categorias', 'destacado', 'publicado']
    search_fields = ['titulo', 'descripcion_corta', 'tecnologias']
    ordering_fields = ['fecha_inicio', 'orden', 'creado']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProyectoListSerializer
        return ProyectoSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Proyecto.objects.filter(publicado=True)
        return Proyecto.objects.all()


class CategoriaProyectoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProyecto.objects.all()
    serializer_class = CategoriaProyectoSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
