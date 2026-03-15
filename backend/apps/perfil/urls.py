from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from .views import PerfilViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', PerfilViewSet, basename='perfil')

urlpatterns = router.urls
