# 📚 Portafolio Profesional - Documentación del Proyecto

> **Versión del Proyecto:** 1.0.0  
> **Fecha de Generación:** 2026-03-16  
> **Proyecto:** Portafolio Profesional  
> **Tecnologías:** Django 5.0 + Django REST Framework | React 18 + TypeScript + Vite
> **Autor:** Daniel Sotomayor  
> **Correo:** danielsotomayor475@email.com

---

## 👤 Información del Autor

| Campo | Valor |
|-------|-------|
| **Nombre** | Daniel Sotomayor |
| **Título** | Desarrollador Full Stack |
| **Correo** | danielsotomayor475@email.com |
| **Ubicación** | Venezuela |
| **GitHub** | github.com/daniel-sotomayor |

---

## 🎯 Introducción

Este sistema de documentación automática genera y mantiene actualizada la documentación técnica del proyecto Portafolio Profesional. La documentación se organiza en las siguientes secciones principales:

---

## 📁 Estructura de Documentación

```
docs/
├── 📄 README.md                      # Este archivo - Índice principal
├── 📄 CHANGELOG.md                   # Registro de cambios de documentación
├── � api/                          # Documentación de endpoints REST
│   ├── index.md                     # Índice de APIs
│   ├── endpoints.md                 # Listado completo de endpoints
│   └── autenticacion.md             # Guía de autenticación JWT
├── 📂 backend/                      # Documentación del Backend
│   ├── models/                      # Modelos Django
│   │   ├── proyectos.md            # Modelo de Proyectos
│   │   ├── perfil.md                # Modelo de Perfil
│   │   ├── experiencia.md           # Modelo de Experiencia
│   │   ├── habilidades.md           # Modelo de Habilidades
│   │   ├── blog.md                  # Modelo de Blog
│   │   ├── contacto.md              # Modelo de Contacto
│   │   └── usuarios.md              # Modelo de Usuarios
│   └── views/                       # Vistas y Serializers
│       └── index.md                  # Índice de vistas
├── 📂 frontend/                     # Documentación del Frontend
│   ├── config.md                    # Configuración del frontend
│   ├── components/                  # Componentes React
│   │   ├── layout/                  # Componentes de layout
│   │   │   └── index.md            # Navbar, Footer, etc.
│   │   └── ui/                     # Componentes UI
│   └── pages/                       # Páginas de la aplicación
│       └── index.md                  # Páginas disponibles
├── 📂 diagramas/                    # Diagramas interactivos
│   ├── arquitectura.md              # Diagrama de arquitectura
│   ├── database.md                  # Diagrama de base de datos
│   └── navegacion.md                # Diagrama de navegación
├── 📂 manuales/                     # Manuales de usuario
│   ├── instalacion.md               # Guía de instalación
│   ├── configuracion.md             # Guía de configuración
│   └── admin.md                     # Guía del panel de admin
├── 📂 assets/                       # Recursos estáticos
│   ├── images/                      # Imágenes
│   └── scripts/                     # Scripts de generación
├── 📄 reporte-qa-seguridad.md       # Reporte de QA y seguridad
└── 📄 validacion-seguridad.md       # Validaciones de seguridad
```

---

## 🚀 Quick Links

| Sección | Descripción |
|---------|-------------|
| [API Endpoints](api/endpoints.md) | Documentación completa de la API REST |
| [Modelos Backend](backend/models/) | Documentación de modelos Django |
| [Componentes Frontend](frontend/components/) | Documentación de componentes React |
| [Diagramas](diagramas/) | Diagramas arquitectónicos |
| [Manuales](manuales/) | Guías de usuario y desarrollo |

---

## ⚡ Generación Automática

Este sistema se actualiza automáticamente mediante scripts de generación. Para regenerar la documentación:

```bash
# Desde la raíz del proyecto
python docs/generate_docs.py
```

### Scripts Disponibles

- `generate_docs.py` - Genera documentación completa
- `generate_api_docs.py` - Genera documentación de API
- `generate_models_docs.py` - Genera documentación de modelos

---

## 📋 Tecnologías del Proyecto

### Backend
- **Framework:** Django 5.0
- **API:** Django REST Framework 3.15
- **Autenticación:** JWT (djangorestframework-simplejwt)
- **Base de Datos:** SQLite (desarrollo) / PostgreSQL (producción)
- **Almacenamiento:** Local (desarrollo) / AWS S3 (producción)
- **Editor de texto:** CKEditor 6.x
- **Documentación API:** drf-yasg

### Frontend
- **Framework:** React 18.x
- **Lenguaje:** TypeScript 5.x
- **Build Tool:** Vite 5.x
- **Estilos:** Tailwind CSS 3.x
- **3D:** React Three Fiber + Drei
- **Animaciones:** Framer Motion
- **HTTP:** Fetch API nativa
- **Routing:** React Router DOM 6.x
- **Gestión de estado:** Context API / Hooks

---

## 🔄 Estado de la Documentación

| Módulo | Estado | Última Actualización |
|--------|--------|---------------------|
| API REST | ✅ Completo | 2026-03-16 |
| Modelos Django | ✅ Completo | 2026-03-16 |
| Vistas/Serializers | ✅ Completo | 2026-03-16 |
| Componentes React | ✅ Completo | 2026-03-16 |
| Páginas | ✅ Completo | 2026-03-16 |
| Diagramas | ✅ Completo | 2026-03-16 |
| Manuales | ✅ Completo | 2026-03-16 |

---

## 📄 Licencia

Este proyecto es de uso personal y educativo. Todos los derechos reservados.

---

## 👥 Créditos

### Desarrollador Principal
- **Daniel Sotomayor** - Desarrollador Full Stack
  - Correo: danielsotomayor475@email.com
  - GitHub: github.com/daniel-sotomayor

### Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Django | 5.0.x | Backend Framework |
| Django REST Framework | 3.15.x | API REST |
| React | 18.x | Frontend Framework |
| TypeScript | 5.x | Tipado estático |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Estilos |
| React Three Fiber | - | Gráficos 3D |
| Framer Motion | - | Animaciones |

---

*Documentación generada para el proyecto Portafolio Profesional*  
*Última actualización: 2026-03-16*
