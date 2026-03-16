# ⚙️ Configuración del Frontend

> **Última Actualización:** 2026-03-16

---

## 📁 Archivos de Configuración

```
frontend/
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
├── postcss.config.js      # Configuración de PostCSS
└── src/
    ├── config/
    │   └── site.ts        # Configuración del sitio
    └── main.tsx           # Punto de entrada
```

---

## 🔧 vite.config.ts

### Descripción

Archivo de configuración de Vite con proxy, headers de seguridad y optimización.

### Configuraciones Principales

| Configuración | Valor | Descripción |
|---------------|-------|-------------|
| Puerto | 5173 | Puerto de desarrollo |
| Proxy API | localhost:8000 | Proxy al backend |
| Minificación | esbuild | Build optimizado |
| Sourcemap | false | Desactivado en producción |

### Headers de Seguridad

```typescript
headers: {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## 🎨 tailwind.config.js

### Descripción

Configuración de Tailwind CSS con temas personalizados y extensiones.

### Colores del Tema

```javascript
colors: {
  primary: '...',
  secondary: '...',
  dark: {
    50: '#f8fafc',
    // ...
    900: '#0f172a',
  }
}
```

---

## 📱 src/config/site.ts

### Descripción

Archivo de configuración del sitio con variables de entorno.

### Configuración

```typescript
interface SiteConfig {
  siteName: string
  ownerName: string
  ownerTitle: string
  email: string
  phone: string
  location: string
  experience: string
  projectsCompleted: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  api: {
    baseUrl: string
    contactEndpoint: string
  }
}
```

### Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_SITE_NAME` | Nombre del sitio |
| `VITE_OWNER_NAME` | Nombre del propietario |
| `VITE_OWNER_TITLE` | Título profesional |
| `VITE_CONTACT_EMAIL` | Email de contacto |
| `VITE_API_URL` | URL base de la API |
