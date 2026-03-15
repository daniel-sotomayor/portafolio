"""
Custom routers para evitar el bug de drf_format_suffix en DRF 3.15+
"""
from rest_framework.routers import DefaultRouter, SimpleRouter


class NoSuffixRouter(SimpleRouter):
    """
    Router que no usa format_suffix_patterns para evitar conflictos
    con el converter 'drf_format_suffix' en Python 3.14 / Django 6.x
    """
    def get_urls(self):
        urls = super().get_urls()
        # Filtrar las URLs que tienen format_suffix
        return [url for url in urls if 'format' not in url.pattern.regex.pattern]


# Alias para usar en las apps
DefaultRouter = NoSuffixRouter
