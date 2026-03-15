# 📚 AutoDoc Generator Pro - Sistema de Documentación Automática

> **Versión:** 1.0.0  
> **Fecha de Generación:** 2026-03-15  
> **Proyecto:** Portafolio Profesional  
> **Tecnologías:** Django 5.0 + Django REST Framework | React 18 + TypeScript + Vite

---

## 🎯 Introducción

Este sistema de documentación automática genera y mantiene actualizada la documentación técnica del proyecto Portafolio Profesional. La documentación se organiza en las siguientes secciones principales:

---

## 📁 Estructura de Documentación

```
docs/
├── 📄 README.md                      # Este archivo - Índice principal
├── 📂 api/                          # Documentación de endpoints REST
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
│       ├── proyectos.md             # ViewSets de Proyectos
│       ├── perfil.md                # ViewSets de Perfil
│       └── ...
├── 📂 frontend/                     # Documentación del Frontend
│   ├── components/                  # Componentes React
│   │   ├── layout/                  # Componentes de layout
│   │   ├── ui/                      # Componentes UI
│   │   └── 3d/                      # Componentes 3D
│   ├── pages/                       # Páginas de la aplicación
│   └── services/                    # Servicios y API calls
├── 📂 diagramas/                    # Diagramas interactivos
│   ├── arquitectura.md              # Diagrama de arquitectura
│   ├── database.md                  # Diagrama de base de datos
│   └── navegacion.md                # Diagrama de navegación
├── 📂 manuales/                     # Manuales de usuario
│   ├── instalacion.md               # Guía de instalación
│   ├── configuracion.md             # Guía de configuración
│   ├── admin.md                     # Guía del panel de admin
│   └── desarrollo.md                # Guía de desarrollo
└── 📂 assets/                       # Recursos estáticos
    ├── images/                      # Imágenes
    └── scripts/                     # Scripts de generación
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

## 📋 Tecnologías Documentadas

### Backend
- **Framework:** Django 5.0.6
- **API:** Django REST Framework 3.14.0
- **Autenticación:** JWT (djangorestframework-simplejwt)
- **Documentación API:** drf-yasg
- **Base de Datos:** PostgreSQL
- **Almacenamiento:** AWS S3

### Frontend
- **Framework:** React 18.3.1
- **Lenguaje:** TypeScript 5.4.5
- **Build Tool:** Vite 5.2.11
- **Estilos:** Tailwind CSS 3.4.3
- **3D:** React Three Fiber + Drei
- **Animaciones:** Framer Motion + GSAP
- **Estado:** Zustand
- **HTTP:** Axios
- **Routing:** React Router DOM 6.23.1

---

## 🔄 Estado de la Documentación

| Módulo | Estado | Última Actualización |
|--------|--------|---------------------|
| API REST | ✅ Completo | 2026-03-15 |
| Modelos Django | ✅ Completo | 2026-03-15 |
| Vistas/Serializers | ✅ Completo | 2026-03-15 |
| Componentes React | ✅ Completo | 2026-03-15 |
| Páginas | ✅ Completo | 2026-03-15 |
| Diagramas | ✅ Completo | 2026-03-15 |
| Manuales | ✅ Completo | 2026-03-15 |

---

## 📞 Soporte

Para actualizar o extender esta documentación, consulta los scripts en `docs/assets/scripts/`.

---

*Generado automáticamente por AutoDoc Generator Pro*  
*Sistema de documentación en tiempo real*
