import logging
import os
from threading import Lock

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db import OperationalError, ProgrammingError, transaction

logger = logging.getLogger(__name__)
_bootstrap_complete = False
_bootstrap_lock = Lock()


class BootstrapAdminMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        _bootstrap_superuser()
        return self.get_response(request)


def _bootstrap_superuser():
    global _bootstrap_complete

    if _bootstrap_complete:
        return

    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'DTSR_admin').strip()
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '')
    if not username or not password:
        _bootstrap_complete = True
        return

    with _bootstrap_lock:
        if _bootstrap_complete:
            return

        user_model = get_user_model()
        try:
            with transaction.atomic():
                user, created = user_model.objects.get_or_create(
                    username=username,
                    defaults={
                        'password': make_password(password),
                        'is_staff': True,
                        'is_superuser': True,
                        'is_active': True,
                    },
                )
        except (OperationalError, ProgrammingError):
            logger.warning('No se pudo crear el administrador inicial; verifica que las migraciones estén aplicadas.')
            return

        if created:
            logger.info('Se creó el administrador inicial configurado por entorno.')
        elif not user.is_superuser:
            logger.warning('El usuario configurado para bootstrap ya existe y no es superusuario.')

        _bootstrap_complete = True