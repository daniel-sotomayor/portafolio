# 📋 Endpoints API - Referencia Completa

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-16

---

## 🏠 Aplicación: Usuarios (`/api/usuarios/`)

### Endpoints

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| POST | `/api/usuarios/register/` | AllowAny | Registrar nuevo usuario |
| POST | `/api/usuarios/login/` | AllowAny | Iniciar sesión |
| POST | `/api/usuarios/logout/` | IsAuthenticated | Cerrar sesión |
| POST | `/api/usuarios/refresh/` | AllowAny | Refrescar token |
| GET | `/api/usuarios/` | IsAuthenticated | Listar usuarios |
| GET | `/api/usuarios/{id}/` | AllowAny | Ver usuario |
| GET | `/api/usuarios/me/` | IsAuthenticated | Usuario actual |
| PUT | `/api/usuarios/me/` | IsAuthenticated | Actualizar usuario |
| DELETE | `/api/usuarios/{id}/` | IsAdmin | Eliminar usuario |

---

## 👤 Aplicación: Perfil (`/api/perfil/`)

### Endpoints

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/perfil/` | AllowAny | Listar perfiles |
| GET | `/api/perfil/public/` | AllowAny | Perfil público |
| GET | `/api/perfil/{id}/` | AllowAny | Ver perfil |
| POST | `/api/perfil/` | IsAuthenticated | Crear perfil |
| PUT | `/api/perfil/{id}/` | IsAuthenticated | Actualizar perfil |
| DELETE | `/api/perfil/{id}/` | IsAuthenticated | Eliminar perfil |
| GET | `/api/perfil/me/` | IsAuthenticated | Mi perfil |

### Filtros Disponibles
- `activo` - Filtrar por estado activo

---

## 💼 Aplicación: Proyectos (`/api/proyectos/`)

### Endpoints

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/proyectos/` | AllowAny | Listar proyectos |
| GET | `/api/proyectos/{slug}/` | AllowAny | Ver proyecto |
| POST | `/api/proyectos/` | IsAuthenticated | Crear proyecto |
| PUT | `/api/proyectos/{slug}/` | IsAuthenticated | Actualizar proyecto |
| DELETE | `/api/proyectos/{slug}/` | IsAuthenticated | Eliminar proyecto |

### Categorías

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/proyectos/categorias/` | AllowAny | Listar categorías |
| GET | `/api/proyectos/categorias/{slug}/` | AllowAny | Ver categoría |
| POST | `/api/proyectos/categorias/` | IsAuthenticated | Crear categoría |
| PUT | `/api/proyectos/categorias/{slug}/` | IsAuthenticated | Actualizar |
| DELETE | `/api/proyectos/categorias/{slug}/` | IsAuthenticated | Eliminar |

### Parámetros de Query
- `?publicado=true` - Filtrar publicados
- `?destacado=true` - Filtrar destacados
- `?categorias={id}` - Filtrar por categoría
- `?search={texto}` - Buscar por título/descripción
- `?ordering=-fecha_inicio` - Ordenar

---

## 💼 Aplicación: Experiencia (`/api/experiencia/`)

### Experiencia Laboral

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/experiencia/` | AllowAny | Listar experiencias |
| GET | `/api/experiencia/{id}/` | AllowAny | Ver experiencia |
| POST | `/api/experiencia/` | IsAuthenticated | Crear experiencia |
| PUT | `/api/experiencia/{id}/` | IsAuthenticated | Actualizar |
| DELETE | `/api/experiencia/{id}/` | IsAuthenticated | Eliminar |

### Educación

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/experiencia/educacion/` | AllowAny | Listar educaciones |
| GET | `/api/experiencia/educacion/{id}/` | AllowAny | Ver educación |
| POST | `/api/experiencia/educacion/` | IsAuthenticated | Crear educación |
| PUT | `/api/experiencia/educacion/{id}/` | IsAuthenticated | Actualizar |
| DELETE | `/api/experiencia/educacion/{id}/` | IsAuthenticated | Eliminar |

---

## 🛠️ Aplicación: Habilidades (`/api/habilidades/`)

### Habilidades

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/habilidades/` | AllowAny | Listar habilidades |
| GET | `/api/habilidades/{id}/` | AllowAny | Ver habilidad |
| POST | `/api/habilidades/` | IsAuthenticated | Crear habilidad |
| PUT | `/api/habilidades/{id}/` | IsAuthenticated | Actualizar |
| DELETE | `/api/habilidades/{id}/` | IsAuthenticated | Eliminar |

### Categorías

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/habilidades/categorias/` | AllowAny | Listar categorías |
| POST | `/api/habilidades/categorias/` | IsAuthenticated | Crear categoría |

### Parámetros de Query
- `?categoria={id}` - Filtrar por categoría

---

## 📝 Aplicación: Blog (`/api/blog/`)

### Artículos

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/blog/` | AllowAny | Listar artículos |
| GET | `/api/blog/{slug}/` | AllowAny | Ver artículo |
| POST | `/api/blog/` | IsAuthenticated | Crear artículo |
| PUT | `/api/blog/{slug}/` | IsAuthenticated | Actualizar |
| DELETE | `/api/blog/{slug}/` | IsAuthenticated | Eliminar |

### Categorías

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| GET | `/api/blog/categorias/` | AllowAny | Listar categorías |
| GET | `/api/blog/categorias/{slug}/` | AllowAny | Ver categoría |
| POST | `/api/blog/categorias/` | IsAuthenticated | Crear categoría |

### Parámetros de Query
- `?publicado=true` - Filtrar publicados
- `?featured=true` - Filtrar destacados
- `?categoria={slug}` - Filtrar por categoría

---

## 📧 Aplicación: Contacto (`/api/contacto/`)

### Mensajes

| Método | Endpoint | Permisos | Descripción |
|--------|----------|----------|-------------|
| POST | `/api/contacto/enviar/` | AllowAny | Enviar mensaje |
| GET | `/api/contacto/` | IsAuthenticated | Listar mensajes |
| GET | `/api/contacto/{id}/` | IsAuthenticated | Ver mensaje |
| PUT | `/api/contacto/{id}/` | IsAuthenticated | Marcar como leído |
| DELETE | `/api/contacto/{id}/` | IsAuthenticated | Eliminar mensaje |

---

## 📊 Códigos de Estado

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Creado |
| 204 | Sin contenido |
| 400 | Solicitud incorrecta |
| 401 | No autorizado |
| 403 | Prohibido |
| 404 | No encontrado |
| 500 | Error del servidor |

---

## 🔐 Autenticación JWT

### Obtener Token de Acceso

```bash
POST /api/usuarios/login/
Content-Type: application/json

{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

**Respuesta:**
```json
{
  "access": "eyJ0eXAiOiJKV1Q...",
  "refresh": "eyJ0eXAiOiJKV1Q...",
  "user": {
    "id": 1,
    "username": "tu_usuario",
    "email": "email@ejemplo.com"
  }
}
```

### Refrescar Token

```bash
POST /api/usuarios/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1Q..."
}
```

---

## 📝 Ejemplos de Uso

### Listar proyectos destacados

```bash
GET /api/proyectos/?destacado=true&ordering=-orden
```

### Buscar proyectos por tecnología

```bash
GET /api/proyectos/?search=django
```

### Obtener perfil público

```bash
GET /api/perfil/public/
```
