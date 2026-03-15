from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from .views import ProyectoViewSet, CategoriaProyectoViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', ProyectoViewSet, basename='proyectos')
router.register(r'categorias', CategoriaProyectoViewSet, basename='categorias')

urlpatterns = router.urls
