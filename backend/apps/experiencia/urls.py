from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from .views import ExperienciaViewSet, EducacionViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'laboral', ExperienciaViewSet, basename='experiencia')
router.register(r'educacion', EducacionViewSet, basename='educacion')

urlpatterns = router.urls
