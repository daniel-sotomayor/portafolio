from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Articulo, CategoriaBlog
from .serializers import ArticuloSerializer, ArticuloListSerializer, CategoriaBlogSerializer


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria', 'publicado', 'featured']
    search_fields = ['titulo', 'resumen', 'contenido']
    ordering_fields = ['fecha_publicacion', 'creado']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ArticuloListSerializer
        return ArticuloSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Articulo.objects.filter(publicado=True)
        return Articulo.objects.all()


class CategoriaBlogViewSet(viewsets.ModelViewSet):
    queryset = CategoriaBlog.objects.all()
    serializer_class = CategoriaBlogSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
