"""
URL configuration for portafolio project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Nota: drf-yasg no es compatible con Python 3.14
# Para documentación, consulta /docs/api/ en el proyecto

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
    
    # Documentación de API disponible en docs/
    # Ejecuta: cd docs && npm install && npm run dev
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
