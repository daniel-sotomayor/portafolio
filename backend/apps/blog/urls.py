from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ArticuloViewSet, CategoriaBlogViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', ArticuloViewSet, basename='articulos')
router.register(r'categorias', CategoriaBlogViewSet, basename='categorias-blog')

urlpatterns = router.urls
