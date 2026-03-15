from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProyectoViewSet, CategoriaProyectoViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', ProyectoViewSet, basename='proyectos')
router.register(r'categorias', CategoriaProyectoViewSet, basename='categorias')

urlpatterns = router.urls
