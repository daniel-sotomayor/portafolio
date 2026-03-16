from django.contrib import admin
from ckeditor.widgets import CKEditorWidget
from django import forms
from .models import Articulo, CategoriaBlog


class ArticuloForm(forms.ModelForm):
    contenido = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = Articulo
        fields = '__all__'


@admin.register(CategoriaBlog)
class CategoriaBlogAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'slug']
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Articulo)
class ArticuloAdmin(admin.ModelAdmin):
    form = ArticuloForm
    list_display = ['titulo', 'categoria', 'autor', 'publicado', 'featured', 'fecha_publicacion']
    list_filter = ['publicado', 'featured', 'categoria']
    search_fields = ['titulo', 'resumen']
    prepopulated_fields = {'slug': ('titulo',)}
