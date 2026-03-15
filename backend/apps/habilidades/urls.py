from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import HabilidadViewSet, CategoriaHabilidadViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', HabilidadViewSet, basename='habilidades')
router.register(r'categorias', CategoriaHabilidadViewSet, basename='categorias-habilidad')

urlpatterns = router.urls
