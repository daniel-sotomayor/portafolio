from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from .views import HabilidadViewSet, CategoriaHabilidadViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', HabilidadViewSet, basename='habilidades')
router.register(r'categorias', CategoriaHabilidadViewSet, basename='categorias-habilidad')

urlpatterns = router.urls
