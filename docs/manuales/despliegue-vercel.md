# Despliegue en Vercel

El repositorio despliega el frontend Vite y el backend Django como servicios separados dentro de un proyecto Vercel. El frontend atiende la raíz y las rutas web; Django atiende la API, el panel y sus estáticos.

## Configuración del proyecto

1. En Vercel, importa `daniel-sotomayor/portafolio`, asigna el nombre `portafolio` y deja el directorio raíz como `.` (raíz del repositorio).
2. No sobrescribas los comandos de build ni el framework: `vercel.json` define los servicios `frontend` (Vite) y `backend` (Django), sus roots y las rutas públicas.
3. En **Settings → Environment Variables**, agrega las variables del backend para Production y Preview:

| Variable | Valor |
| --- | --- |
| `SECRET_KEY` | Una clave Django aleatoria y privada |
| `DEBUG` | `False` |
| `DATABASE_URL` | URL de una base PostgreSQL persistente. Si usas la integración de Supabase, el backend también acepta `POSTGRES_URL_NON_POOLING` y `POSTGRES_URL` |
| `ALLOWED_HOSTS` | `.vercel.app,tu-dominio.com` (añade el dominio propio si aplica) |
| `DJANGO_SUPERUSER_USERNAME` | `DTSR_admin` (valor predeterminado) |
| `DJANGO_SUPERUSER_PASSWORD` | La contraseña solicitada, guardada como secreto en Vercel |

`SECRET_KEY` debe ser una clave Django aleatoria, no la contraseña de Supabase ni `SUPABASE_JWT_SECRET`. `DEBUG` debe ser exactamente `False`. `DATABASE_URL` tiene prioridad; si falta, Django acepta `POSTGRES_URL_NON_POOLING` o `POSTGRES_URL`. Usa una URL PostgreSQL, no `SUPABASE_URL`, la clave anon ni la service-role key.

No configures `VITE_API_URL` para este despliegue: el frontend llama a `/api` en el mismo dominio. `CORS_ALLOWED_ORIGINS` solo se necesita si frontend y API están en dominios distintos. Las variables `VITE_*` son públicas y se incorporan al bundle del navegador; nunca pongas secretos en ellas.

## Servicios y rutas

| Servicio | Framework | Rutas públicas |
| --- | --- | --- |
| `frontend` | Vite | `/` y el resto de rutas web |
| `backend` | Django | `/api/*`, `/admin`, `/admin/*` y `/static/*` |

No hay servicios internos ni bindings: las llamadas del frontend a Django se realizan desde el navegador al path público `/api` del mismo dominio.

Las rutas `/api/*`, `/admin*` y `/static/*` se envían a Django; la regla final `/(.*)` envía el resto al frontend. Los nombres de servicio y estos rewrites deben coincidir con `vercel.json`.

Genera `SECRET_KEY` en una terminal local con `python -c "import secrets; print(secrets.token_urlsafe(64))"` y pégala directamente en las variables de entorno de Vercel. No la guardes en `.env` versionados ni en el código.

## Base de datos y archivos

SQLite no es persistente en Vercel. Usa PostgreSQL administrado. Después de agregar la URL a Vercel, ejecuta las migraciones una vez contra esa misma base desde la raíz del repo, en un entorno que tenga instaladas las dependencias de `backend/requirements.txt`:

```bash
cd backend
read -rsp 'URL PostgreSQL: ' DB_URL; printf '\n'
DATABASE_URL="$DB_URL" python manage.py migrate --noinput
migration_status=$?
unset DB_URL
if [[ $migration_status -ne 0 ]]; then
	exit "$migration_status"
fi
```

El prompt oculta la URL para que no quede escrita en el historial del shell. Usa la URL completa de PostgreSQL, con contraseña y `sslmode=require`; el backend normaliza los parámetros auxiliares `supa` y `pgbouncer` de las URLs de Supabase.

Después de migrar, configura `DJANGO_SUPERUSER_USERNAME` (opcional, por defecto `DTSR_admin`) y `DJANGO_SUPERUSER_PASSWORD` en Vercel antes de la primera petición a Django. Esa petición crea el superusuario solo si aún no existe. Cambiar la variable no cambia la contraseña de una cuenta existente; en ese caso, inicia sesión y cámbiala desde el admin, o usa `python manage.py changepassword DTSR_admin` contra la misma base.

Los archivos subidos a `MEDIA_ROOT` tampoco persisten entre ejecuciones. Para imágenes del blog o proyectos, crea un bucket en Supabase Storage y genera credenciales S3 en la configuración S3 de Storage. Configura en Vercel `AWS_STORAGE_BUCKET_NAME`, `AWS_S3_ENDPOINT_URL` (`https://<project-ref>.supabase.co/storage/v1/s3`), `AWS_S3_REGION_NAME` y las credenciales `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` generadas para S3. No uses `SUPABASE_SERVICE_ROLE_KEY` como credencial S3. Sin estas variables, Django usa almacenamiento local, que no persiste en Vercel y puede provocar un 500 al guardar un artículo con imagen.

## Comprobación

Al desplegar, verifica la portada, `/favicon.svg`, `/api/proyectos/`, `/api/blog/`, `/admin/login/` y los estilos bajo `/static/admin/`. Las APIs pueden devolver listas vacías hasta que agregues datos desde el admin. Si una operación devuelve 500, consulta los Runtime Logs del servicio `backend`; no publiques el traceback con secretos.