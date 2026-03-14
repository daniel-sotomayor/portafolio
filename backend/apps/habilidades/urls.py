from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabilidadViewSet, CategoriaHabilidadViewSet

router = DefaultRouter()
router.register(r'', HabilidadViewSet, basename='habilidades')
router.register(r'categorias', CategoriaHabilidadViewSet, basename='categorias-habilidad')

urlpatterns = [
    path('', include(router.urls)),
]
