"""
URL configuration for portafolio project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect

# Parche para evitar conflicto con drf_format_suffix converter
# https://github.com/encode/django-rest-framework/issues/6805
import django

# Verificar si el converter ya está registrado y limpiar si es necesario
if hasattr(django.urls.converters, '_registry'):
    django.urls.converters._registry = {}

# Registrar un converter dummy para evitar conflictos
class DummyConverter:
    regex = '.*'
    
    def to_python(self, value):
        return value
    
    def to_url(self, value):
        return value

# Registrar el converter si no existe (para evitar el error de registro duplicado)
try:
    from django.urls.converters import register_converter
    register_converter(DummyConverter, 'drf_format_suffix')
except ValueError:
    pass  # Ya registrado

# Nota: drf-yasg no es compatible con Python 3.14
# Para documentación, consulta /docs/api/ en el proyecto

urlpatterns = [
    path('', lambda request: redirect('admin:index' if request.user.is_authenticated else 'admin:login', permanent=False)),
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

# Servir archivos media en desarrollo y producción
# En producción se debe configurar nginx/AWS S3 para servir estos archivos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
