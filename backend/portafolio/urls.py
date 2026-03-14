"""
URL configuration for portafolio project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Portafolio API",
        default_version='v1',
        description="API para el portafolio personal",
        contact=openapi.Contact(email="contacto@ejemplo.com"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Apps
    path('api/usuarios/', include('apps.usuarios.urls')),
    path('api/perfil/', include('apps.perfil.urls')),
    path('api/proyectos/', include('apps.proyectos.urls')),
    path('api/experiencia/', include('apps.experiencia.urls')),
    path('api/habilidades/', include('apps.habilidades.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/contacto/', include('apps.contacto.urls')),
    
    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
