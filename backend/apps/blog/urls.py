from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticuloViewSet, CategoriaBlogViewSet

router = DefaultRouter()
router.register(r'', ArticuloViewSet, basename='articulos')
router.register(r'categorias', CategoriaBlogViewSet, basename='categorias-blog')

urlpatterns = [
    path('', include(router.urls)),
]
