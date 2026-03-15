from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MensajeContactoViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', MensajeContactoViewSet, basename='contacto')

urlpatterns = router.urls
