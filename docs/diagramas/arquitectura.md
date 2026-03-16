# 🏗️ Diagrama de Arquitectura

> **Última Actualización:** 2026-03-16

---

## 📊 Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    React + TypeScript                     │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │   │
│  │  │  Home   │ │Projects │ │  About  │ │ Blog    │        │   │
│  │  │  Page   │ │  Page   │ │  Page   │ │  Page   │        │   │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │   │
│  │       └───────────┴───────────┴───────────┘               │   │
│  │                         │                                  │   │
│  │                  ┌──────┴──────┐                          │   │
│  │                  │   Zustand   │  Estado global           │   │
│  │                  └──────┬──────┘                          │   │
│  │                         │                                  │   │
│  │                  ┌──────┴──────┐                          │   │
│  │                  │    Axios    │  Cliente HTTP            │   │
│  │                  └──────┬──────┘                          │   │
│  └─────────────────────────┼────────────────────────────────┘   │
│                            │                                     │
│                            │ REST API                            │
│                            │                                     │
└────────────────────────────┼────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │    NGINX/       │  Proxy reverso
                    │    Apache       │
                    └────────┬────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                     SERVIDOR (Backend)                          │
│                            │                                     │
│                    ┌──────┴──────┐                              │
│                    │   Django    │  Framework Python            │
│                    │   REST API  │                              │
│                    └──────┬──────┘                              │
│                           │                                     │
│    ┌──────────────────────┼──────────────────────┐            │
│    │                      │                      │            │
│ ┌──┴───┐  ┌──────────┐  ┌┴────┐  ┌─────────┐  ┌┴─────┐      │
│ │Auth  │  │ Views/   │  │Per- │  │Proyec- │  │Blog  │      │
│ │JWT   │  │Serializ. │  │fil  │  │tos     │  │      │      │
│ └──┬───┘  └────┬─────┘  └──┬───┘  └───┬────┘  └──┬────┘      │
│    │           │            │          │          │            │
│    └───────────┴────────────┴──────────┴──────────┘            │
│                         │                                       │
│    ┌────────────────────┴────────────────────┐                  │
│    │              DATABASE                   │                  │
│    │            PostgreSQL                   │                  │
│    └────────────────────────────────────────┘                  │
│                                                               │
│    ┌────────────────────────────────────────┐                  │
│    │           MEDIA STORAGE                │                  │
│    │          AWS S3 / Local                │                  │
│    └────────────────────────────────────────┘                  │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### 1. Solicitud Pública
```
Usuario → Frontend → API Django → Database → Response
```

### 2. Solicitud Autenticada
```
Usuario → Login → JWT Token → Frontend → API + Token → Permisos → Database
```

### 3. Envío de Formulario
```
Usuario → Formulario → Validación → API → Email → Database
```

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 18 | Framework UI |
| TypeScript | Tipado estático |
| Vite | Build tool |
| Tailwind CSS | Estilos |
| React Three Fiber | 3D |
| Framer Motion | Animaciones |
| Context API | Estado global |
| Fetch API | HTTP Client |

### Backend
| Tecnología | Uso |
|------------|-----|
| Django 5 | Framework web |
| Django REST Framework | API REST |
| JWT | Autenticación |
| SQLite (dev) / PostgreSQL (prod) | Base de datos |
| drf-yasg | Documentación API |
| CKEditor | Editor de texto |
| AWS S3 | Almacenamiento (prod) |

---

## 📁 Estructura del Proyecto

```
Portafolio/
├── backend/                 # Django API
│   ├── apps/               # Aplicaciones
│   │   ├── usuarios/      # Gestión de usuarios
│   │   ├── perfil/        # Perfil público
│   │   ├── proyectos/     # Proyectos
│   │   ├── experiencia/   # Experiencia laboral
│   │   ├── habilidades/   # Habilidades
│   │   ├── blog/          # Blog
│   │   └── contacto/      # Contacto
│   └── portafolio/        # Configuración
│
├── frontend/               # React App
│   ├── src/
│   │   ├── components/    # Componentes
│   │   ├── pages/        # Páginas
│   │   ├── config/       # Configuración
│   │   └── services/    # Servicios
│   └── public/           # Estáticos
│
└── docs/                   # Documentación
    ├── api/               # API docs
    ├── backend/           # Backend docs
    ├── frontend/          # Frontend docs
    └── diagramas/         # Diagramas
```
