# 🎨 Componentes del Frontend

> **Última Actualización:** 2026-03-16

---

## 📁 Estructura de Componentes

```
frontend/src/components/
├── layout/
│   ├── Navbar.tsx       # Barra de navegación
│   └── Footer.tsx       # Pie de página
├── ui/
│   └── Cursor.tsx       # Cursor personalizado
└── 3d/
    └── Hero3D.tsx       # Hero con Three.js
```

---

## 🧭 Navbar

> **Archivo:** `frontend/src/components/layout/Navbar.tsx`

### Descripción

Componente de navegación principal que incluye menú responsive y enlaces a las diferentes secciones del portafolio.

### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `textEnter` | `() => void` | Callback al entrar en texto |
| `textLeave` | () => void` | Callback al salir de texto |

### Características

- ✅ Responsive con menú hamburguesa
- ✅ Efectos de hover
- ✅ Indicador de página activa
- ✅ Integración con cursor personalizado

---

## 🦶 Footer

> **Archivo:** `frontend/src/components/layout/Footer.tsx`

### Descripción

Pie de página con información de contacto, redes sociales y enlaces rápidos.

### Características

- ✅ Información de contacto
- ✅ Redes sociales
- ✅ Enlaces a secciones
- ✅ Copyright

---

## 👆 Cursor

> **Archivo:** `frontend/src/components/ui/Cursor.tsx`

### Descripción

Cursor personalizado que sigue el movimiento del mouse y cambia de estado según el elemento hovered.

### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `mousePosition` | `{ x: number, y: number }` | Posición del mouse |
| `cursorVariant` | `'default' \| 'text'` | Variante del cursor |

### Estados

| Estado | Descripción |
|--------|-------------|
| `default` | Cursor circular padrão |
| `text` | Cursor扩大 para texto |

---

## 🌐 Hero3D

> **Archivo:** `frontend/src/components/3d/Hero3D.tsx`

### Descripción

Componente 3D del hero principal utilizando React Three Fiber.

### Características

- ✅ Renderizado 3D con Three.js
- ✅ Animaciones interactivas
- ✅ Optimizado para rendimiento
- ✅ Fallback para dispositivos sin WebGL
