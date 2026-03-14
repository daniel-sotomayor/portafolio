from django.contrib import admin
from .models import MensajeContacto


@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'email', 'asunto', 'leido', 'contestado', 'creado']
    list_filter = ['leido', 'contestado']
    search_fields = ['nombre', 'email', 'asunto', 'mensaje']
    readonly_fields = ['creado']
