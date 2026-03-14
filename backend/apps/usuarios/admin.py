from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_admin_portafolio']
    list_filter = ['is_staff', 'is_admin_portafolio', 'is_superuser']
    fieldsets = UserAdmin.fieldsets + (
        ('Información adicional', {'fields': ('avatar', 'bio', 'telefono', 'fecha_nacimiento', 'pais', 'ciudad')}),
        ('Redes sociales', {'fields': ('github_url', 'linkedin_url', 'twitter_url', 'instagram_url', 'website_url')}),
        ('Permisos especiales', {'fields': ('is_admin_portafolio',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información adicional', {'fields': ('email', 'first_name', 'last_name')}),
    )
