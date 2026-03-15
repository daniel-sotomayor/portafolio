# 👨‍💼 Guía del Panel de Admin

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-15

---

## 🔗 Acceso al Admin

```
URL: http://localhost:8000/admin/
Usuario: Tu usuario admin
Contraseña: Tu contraseña
```

---

## 📋 Aplicaciones Disponibles

### 1. Usuarios

| Modelo | Descripción |
|--------|-------------|
| Usuarios | Gestión de usuarios del sistema |

**Campos editables:**
- Username
- Email
- First name / Last name
- Avatar
- Bio
- Redes sociales
- Permisos (is_staff, is_active, is_superuser)

---

### 2. Perfil

| Modelo | Descripción |
|--------|-------------|
| Perfiles | Información pública del portafolio |

**Campos editables:**
- Usuario asociado
- Nombre completo
- Título profesional
- Biografía corta y larga
- Email y teléfono
- Ubicación
- Foto de perfil
- CV PDF
- Colores del tema
- Meta tags SEO
- Estado (activo/inactivo)

---

### 3. Proyectos

| Modelo | Descripción |
|--------|-------------|
| Proyectos | Proyectos del portafolio |
| Categorías de Proyecto | Categorías para clasificar proyectos |

**Proyectos - Campos:**
- Título
- Slug (URL amigable)
- Descripciones
- Imagen
- Categorías
- URLs (demo, código, documentación)
- Tecnologías (JSON)
- Características (JSON)
- Fechas
- Destacado
- Orden
- Estado (publicado)

---

### 4. Experiencia

| Modelo | Descripción |
|--------|-------------|
| Experiencias | Experiencia laboral |
| Educaciones | Formación académica |

**Experiencia - Campos:**
- Empresa
- Cargo
- Descripción
- Logo
- Ubicación
- URL empresa
- Fechas
- Actual (trabajo actual)
- Orden

---

### 5. Habilidades

| Modelo | Descripción |
|--------|-------------|
| Habilidades | Habilidades técnicas y blandas |
| Categorías de Habilidad | Categorías de habilidades |

**Habilidades - Campos:**
- Nombre
- Icono
- Categoría
- Nivel (0-100)
- Descripción
- Años de experiencia
- Orden

---

### 6. Blog

| Modelo | Descripción |
|--------|-------------|
| Artículos | Artículos del blog |
| Categorías de Blog | Categorías de artículos |

**Artículos - Campos:**
- Título
- Slug
- Resumen
- Contenido (CKEditor)
- Imagen
- Categoría
- Autor
- Etiquetas (JSON)
- Meta tags SEO
- Estado (publicado, destacado)
- Fecha de publicación

---

### 7. Contacto

| Modelo | Descripción |
|--------|-------------|
| Mensajes de Contacto | Mensajes recibidos |

**Campos:**
- Nombre
- Email
- Asunto
- Mensaje
- Teléfono
- Leído
- Contestado
- Respuesta

---

## ⚙️ Configuración de CKEditor

El campo de contenido en Blog usa CKEditor. Configuraciones disponibles:

- Negrita, Cursiva, Subrayado
- Encabezados (H1-H6)
- Listas (ordenadas y no ordenadas)
- Enlaces
- Imágenes
- Videos
- Código
- Blockquotes

---

## 📊 Mejores Prácticas

### Proyectos
1. ✅ Agregar imagen representativa
2. ✅ Incluir tecnologías utilizadas
3. ✅ Agregar enlaces funcionales
4. ✅ Marcar proyectos destacados
5. ✅ Ordenar por prioridad

### Blog
1. ✅ Usar meta tags para SEO
2. ✅ Agregar imágenes destacadas
3. ✅ Usar categorías apropiadas
4. ✅ Agregar etiquetas relevantes
5. ✅ Publicar con fecha futura para programar
