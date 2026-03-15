from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from .views import MensajeContactoViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', MensajeContactoViewSet, basename='contacto')

urlpatterns = router.urls
