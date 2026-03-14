from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MensajeContactoViewSet

router = DefaultRouter()
router.register(r'', MensajeContactoViewSet, basename='contacto')

urlpatterns = [
    path('', include(router.urls)),
]
