# 📡 Índice de API - Portafolio Profesional

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-15

---

## 🔗 Base URL

```
Production: https://api.tusitio.com/
Development: http://localhost:8000/
```

---

## 📋 Aplicaciones API Disponibles

| App | Prefijo | Descripción |
|-----|---------|-------------|
| **Usuarios** | `/api/usuarios/` | Gestión de usuarios y autenticación |
| **Perfil** | `/api/perfil/` | Perfil público del portafolio |
| **Proyectos** | `/api/proyectos/` | Proyectos del portafolio |
| **Experiencia** | `/api/experiencia/` | Experiencia laboral y educación |
| **Habilidades** | `/api/habilidades/` | Habilidades técnicas y blandas |
| **Blog** | `/api/blog/` | Artículos del blog |
| **Contacto** | `/api/contacto/` | Formulario de contacto |

---

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para autenticación.

### Endpoints de Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/register/` | Registrar nuevo usuario |
| POST | `/api/usuarios/login/` | Iniciar sesión |
| POST | `/api/usuarios/logout/` | Cerrar sesión |
| POST | `/api/usuarios/refresh/` | Refrescar token JWT |
| GET | `/api/usuarios/me/` | Obtener usuario actual |

### Headers de Autorización

```http
Authorization: Bearer <access_token>
```

---

## � Punkte: Permisos por Endpoint

| Tipo | Descripción |
|------|-------------|
| `AllowAny` | Acceso público sin autenticación |
| `IsAuthenticated` | Requiere usuario autenticado |
| `IsAdmin` | Requiere privilegios de administrador |

---

## 📖 Documentación por Aplicación

### 1. Usuarios
- [Endpoints de Usuarios](usuarios.md)
- Modelos: [`Usuario`](../backend/models/usuarios.md)

### 2. Perfil
- [Endpoints de Perfil](perfil.md)
- Modelos: [`Perfil`](../backend/models/perfil.md)

### 3. Proyectos
- [Endpoints de Proyectos](proyectos.md)
- Modelos: [`Proyecto`, `CategoriaProyecto`](../backend/models/proyectos.md)

### 4. Experiencia
- [Endpoints de Experiencia](experiencia.md)
- Modelos: [`Experiencia`, `Educacion`](../backend/models/experiencia.md)

### 5. Habilidades
- [Endpoints de Habilidades](habilidades.md)
- Modelos: [`Habilidad`, `CategoriaHabilidad`](../backend/models/habilidades.md)

### 6. Blog
- [Endpoints de Blog](blog.md)
- Modelos: [`Articulo`, `CategoriaBlog`](../backend/models/blog.md)

### 7. Contacto
- [Endpoints de Contacto](contacto.md)
- Modelos: [`MensajeContacto`](../backend/models/contacto.md)

---

## 🔄 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Solicitud exitosa |
| `201` | Created - Recurso creado |
| `204` | No Content - Sin contenido |
| `400` | Bad Request - Solicitud inválida |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Recurso no encontrado |
| `500` | Internal Server Error - Error del servidor |

---

## 📝 Formato de Respuesta

### Éxito
```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  }
}
```

---

## 🔧 Filtering, Searching & Ordering

### Filtering
```
GET /api/proyectos/?publicado=true&destacado=true
```

### Searching
```
GET /api/proyectos/?search=django
```

### Ordering
```
GET /api/proyectos/?ordering=-fecha_inicio
```

---

## 📦 Swagger/OpenAPI

La documentación interactiva está disponible en:

- **Swagger UI:** `/api/docs/`
- **ReDoc:** `/api/redoc/`
- **OpenAPI JSON:** `/api/docs.json/`

---

## ⚡ Próximos Pasos

- [Ver Endpoints Completos](endpoints.md)
- [Guía de Autenticación](autenticacion.md)
