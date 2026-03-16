# 🧭 Diagrama de Navegación

> **Última Actualización:** 2026-03-16

---

## 📱 Flujo de Navegación

```
┌─────────────────────────────────────────────────────────────────┐
│                          NAVBAR                                  │
│  ┌────────┬────────┬────────┬────────┬────────┐               │
│  │  Home  │Projects│  About │  Blog  │Contact │   [Logo]      │
│  └───┬────┴───┬────┴───┬────┴───┬────┴───┬────┘               │
└──────┼────────┼────────┼────────┼────────┼──────────────────────┘
       │        │        │        │        │
       ▼        ▼        ▼        ▼        ▼
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────┐│
│  │  Home   │  │Projects │  │  About  │  │  Blog   │  │Con- ││
│  │  Page   │  │  Page   │  │  Page   │  │  Page   │  │tact ││
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └──┬───┘│
│       │            │            │            │            │    │
│       │            │            │            │            │    │
│       ▼            ▼            ▼            ▼            ▼    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ Proyec- │  │Proyecto │  │Experien-│  │Artículo │         │
│  │ to      │  │ Detail  │  │cia      │  │ Detail  │         │
│  │ Detail  │  │         │  │Detail   │  │         │         │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Rutas del Frontend

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Página principal |
| `/projects` | Projects | Lista de proyectos |
| `/projects/:slug` | ProjectDetail | Detalle de proyecto |
| `/about` | About | Sobre mí |
| `/blog` | Blog | Lista de artículos |
| `/blog/:slug` | ArticleDetail | Detalle de artículo |
| `/contact` | Contact | Formulario de contacto |

---

## 🔐 Rutas Protegidas (Admin)

| Ruta | Descripción |
|------|-------------|
| `/admin` | Panel de Django admin |
| `/api/admin/` | Panel de administración API |

---

## 📱 Navegación Mobile

```
┌─────────────────────┐
│        ☰           │
│   [Logo]    [Github]│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        Home         │
│      Projects       │
│       About         │
│        Blog         │
│      Contact        │
└─────────────────────┘
```

---

## 🔄 Flujo de Usuario

### Visitante
```
Landing → Ver Proyectos → Ver Detalle → Ver Blog → Contactar
```

### Cliente Potencial
```
Ver Proyectos → Ver About → Ver Blog → Contactar
```

### Administrador
```
Login → Dashboard → Gestionar Contenido
```
