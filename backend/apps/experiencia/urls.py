from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExperienciaViewSet, EducacionViewSet

router = DefaultRouter()
router.register(r'laboral', ExperienciaViewSet, basename='experiencia')
router.register(r'educacion', EducacionViewSet, basename='educacion')

urlpatterns = [
    path('', include(router.urls)),
]
