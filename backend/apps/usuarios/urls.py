from django.urls import path
from apps.utils.routers import NoSuffixRouter as DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UsuarioViewSet, RegisterView

router = DefaultRouter(trailing_slash=False)
router.register(r'', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
