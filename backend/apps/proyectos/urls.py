from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProyectoViewSet, CategoriaProyectoViewSet

router = DefaultRouter()
router.register(r'', ProyectoViewSet, basename='proyectos')
router.register(r'categorias', CategoriaProyectoViewSet, basename='categorias')

urlpatterns = [
    path('', include(router.urls)),
]
