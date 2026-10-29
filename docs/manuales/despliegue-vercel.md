# Despliegue en Vercel

El repositorio despliega el frontend Vite y el backend Django como servicios separados dentro de un proyecto Vercel. El frontend atiende la raíz y las rutas web; Django atiende la API, el panel y sus estáticos.

## Configuración del proyecto

1. Importa `daniel-sotomayor/portafolio` en Vercel, usa `portafolio` como nombre del proyecto y deja como directorio raíz la raíz del repositorio.
2. Configura las variables de entorno siguientes para Production y Preview:

| Variable | Valor |
| --- | --- |
| `SECRET_KEY` | Una clave Django aleatoria y privada |
| `DEBUG` | `False` |
| `DATABASE_URL` | URL de una base PostgreSQL persistente |
| `ALLOWED_HOSTS` | `.vercel.app,tu-dominio.com` (añade el dominio propio si aplica) |
| `DJANGO_SUPERUSER_USERNAME` | `DTSR_admin` (valor predeterminado) |
| `DJANGO_SUPERUSER_PASSWORD` | La contraseña solicitada, guardada como secreto en Vercel |

No configures `VITE_API_URL` para este despliegue: el frontend llama a `/api` en el mismo dominio. `CORS_ALLOWED_ORIGINS` solo es necesario si el frontend y la API se sirven desde dominios distintos.

## Servicios y rutas

| Servicio | Framework | Rutas públicas |
| --- | --- | --- |
| `frontend` | Vite | `/` y el resto de rutas web |
| `backend` | Django | `/api/*`, `/admin`, `/admin/*` y `/static/*` |

No hay servicios internos ni bindings: las llamadas del frontend a Django se realizan desde el navegador al path público `/api` del mismo dominio.

Genera la clave de Django localmente con `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` y añádela directamente en Settings de Vercel, nunca al repositorio.

## Base de datos y archivos

SQLite no es persistente en Vercel. Crea una base PostgreSQL administrada y configura su URL completa en `DATABASE_URL`. Antes de usar la API, ejecuta las migraciones contra esa base desde un entorno seguro con las mismas variables:

```bash
cd backend
python manage.py migrate
```

Después de aplicar las migraciones, la primera petición a Django crea el superusuario configurado en `DJANGO_SUPERUSER_USERNAME` y `DJANGO_SUPERUSER_PASSWORD`, si todavía no existe. La contraseña se guarda con hash y solo se usa al crear la cuenta. Configura ambas variables en Vercel antes de la primera petición; no las añadas a archivos del repositorio.

Los archivos subidos a `MEDIA_ROOT` tampoco persisten entre ejecuciones. Para conservar imágenes del blog o proyectos, configura un bucket S3 y estas variables en Vercel: `AWS_STORAGE_BUCKET_NAME`, `AWS_S3_REGION_NAME`, `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`. No guardes credenciales ni medios en Git. Sin bucket configurado, el backend usa el almacenamiento local, que no es persistente en Vercel.

## Comprobación

Al desplegar, verifica la portada, una ruta interna del frontend, `/api/proyectos/` y `/admin/`. El servicio Django debe recopilar los estáticos del panel durante su build.