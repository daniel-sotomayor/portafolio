# 📄 Páginas del Frontend

> **Última Actualización:** 2026-03-16

---

## 📋 Páginas Disponibles

```
frontend/src/pages/
├── Home.tsx        # Página principal
├── Projects.tsx    # Proyectos
├── About.tsx       # Sobre mí
├── Blog.tsx        # Blog
└── Contact.tsx     # Contacto
```

---

## 🏠 Home

> **Archivo:** `frontend/src/pages/Home.tsx`

### Descripción

Página principal del portafolio con hero 3D, destacados y llamada a la acción.

### Secciones

- Hero con animación 3D
- Proyectos destacados
- Habilidades principales
- Call to action

### Ruta

```
GET /
```

---

## 💼 Projects

> **Archivo:** `frontend/src/pages/Projects.tsx`

### Descripción

Página de visualización de proyectos con filtros y búsqueda.

### Características

- ✅ Listado de proyectos
- ✅ Filtros por categoría
- ✅ Búsqueda por texto
- ✅ Modal de detalles

### Ruta

```
GET /projects
```

---

## 👤 About

> **Archivo:** `frontend/src/pages/About.tsx`

### Descripción

Página "Sobre mí" con información personal, experiencia y educación.

### Secciones

- Perfil profesional
- Experiencia laboral
- Educación
- Habilidades

### Ruta

```
GET /about
```

---

## 📝 Blog

> **Archivo:** `frontend/src/pages/Blog.tsx`

### Descripción

Página del blog con artículos publicados.

### Características

- ✅ Listado de artículos
- ✅ Filtros por categoría
- ✅ Artículos destacados
- ✅ Vista de artículo individual

### Ruta

```
GET /blog
GET /blog/:slug
```

---

## 📧 Contact

> **Archivo:** `frontend/src/pages/Contact.tsx`

### Descripción

Página de contacto con formulario y información de contacto.

### Características

- ✅ Formulario de contacto
- ✅ Validación de campos
- ✅ Integración con API
- ✅ Información de contacto
- ✅ Redes sociales

### Ruta

```
GET /contact
```

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contacto/enviar/` | Enviar mensaje |

---

## 🔗 Configuración de Rutas

```typescript
// frontend/src/App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/about" element={<About />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```
