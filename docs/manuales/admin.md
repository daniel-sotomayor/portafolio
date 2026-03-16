# 👨‍💼 Guía del Panel de Administración

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-16

---

## 🔗 Acceso al Admin

### URL del Panel

```
http://localhost:8000/admin/
```

### Credenciales

| Campo | Descripción |
|-------|-------------|
| Usuario | Tu nombre de usuario admin |
| Contraseña | Tu contraseña de administrador |

> **Nota:** Si no tienes un usuario administrador, consulta la [guía de instalación](../manuales/instalacion.md#crear-super-usuario).

---

## 📋 Aplicaciones Disponibles

El panel de administración incluye las siguientes aplicaciones:

### 1. Usuarios

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Usuarios | Gestión de usuarios del sistema | Staff/Admin |

**Campos editables:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Username | CharField | Nombre de usuario único |
| Email | EmailField | Correo electrónico |
| First name | CharField | Nombre |
| Last name | CharField | Apellido |
| Avatar | ImageField | Foto de perfil |
| Bio | TextField | Biografía |
| Teléfono | CharField | Número de teléfono |
| Fecha de nacimiento | DateField | Fecha de nacimiento |
| País | CharField | País de residencia |
| Ciudad | CharField | Ciudad de residencia |
| GitHub URL | URLField | Enlace a GitHub |
| LinkedIn URL | URLField | Enlace a LinkedIn |
| Twitter URL | URLField | Enlace a Twitter |
| Instagram URL | URLField | Enlace a Instagram |
| Website URL | URLField | Sitio web personal |
| is_staff | BooleanField | Acceso al admin |
| is_active | BooleanField | Cuenta activa |
| is_superuser | BooleanField | Super usuario |
| is_admin_portafolio | BooleanField | Admin del portafolio |
| Date joined | DateTimeField | Fecha de registro |

---

### 2. Perfil

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Perfiles | Información pública del portafolio | Staff/Admin |

**Campos editables:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Usuario | ForeignKey | ✅ | Usuario asociado |
| Nombre completo | CharField(200) | ✅ | Nombre completo |
| Título profesional | CharField(200) | ✅ | Profesión/título |
| Biografía corta | TextField(300) | ✅ | Resumen para SEO |
| Biografía larga | TextField | ✅ | Biografía completa |
| Email | EmailField | ✅ | Correo de contacto |
| Teléfono | CharField(20) | ❌ | Número de teléfono |
| Ubicación | CharField(200) | ✅ | Ciudad, País |
| Foto de perfil | ImageField | ❌ | Imagen de perfil |
| CV PDF | FileField | ❌ | Curriculum vitae |
| Redes sociales | JSONField | ❌ | Objeto con enlaces |
| Color primario | CharField(7) | ❌ | Color principal (hex) |
| Color secundario | CharField(7) | ❌ | Color de acento (hex) |
| Color oscuro | CharField(7) | ❌ | Color de fondo oscuro |
| Color claro | CharField(7) | ❌ | Color de fondo claro |
| Meta título | CharField(60) | ❌ | Título SEO |
| Meta descripción | CharField(160) | ❌ | Descripción SEO |
| Meta imagen | ImageField | ❌ | Imagen para Open Graph |
| Activo | BooleanField | ❌ | ¿Perfil visible? |

**Estructura de Redes Sociales (JSON):**

```json
{
  "github": "https://github.com/usuario",
  "linkedin": "https://linkedin.com/in/usuario",
  "twitter": "https://twitter.com/usuario",
  "instagram": "https://instagram.com/usuario"
}
```

---

### 3. Proyectos

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Proyectos | Proyectos del portafolio | Staff/Admin |
| Categorías de Proyecto | Clasificación de proyectos | Staff/Admin |

#### Proyectos - Campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Título | CharField(200) | ✅ | Nombre del proyecto |
| Slug | SlugField | ✅ | URL amigable (único) |
| Descripción corta | CharField(300) | ✅ | Resumen del proyecto |
| Descripción larga | TextField | ✅ | Descripción completa |
| Imagen | ImageField | ✅ | Imagen principal |
| Categorías | ManyToMany | ❌ | Categorías relacionadas |
| URL Demo | URLField | ❌ | Enlace a demo |
| URL Código | URLField | ❌ | Enlace a GitHub |
| URL Documentación | URLField | ❌ | Enlace a docs |
| Tecnologías | JSONField | ❌ | Lista de tecnologías |
| Características | JSONField | ❌ | Lista de características |
| Fecha inicio | DateField | ✅ | Inicio del proyecto |
| Fecha fin | DateField | ❌ | Fin del proyecto |
| En progreso | BooleanField | ❌ | ¿Está en desarrollo? |
| Destacado | BooleanField | ❌ | ¿Proyecto destacado? |
| Orden | IntegerField | ❌ | Orden de visualización |
|Publicado | BooleanField | ❌ | ¿Publicar en el sitio? |

**Ejemplo de Tecnologías (JSON):**

```json
["Django", "React", "PostgreSQL", "Docker", "AWS"]
```

**Ejemplo de Características (JSON):**

```json
["Autenticación JWT", "API REST", "Panel de admin", "Diseño responsive"]
```

#### Categorías de Proyecto - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Nombre | CharField(100) | Nombre de la categoría |
| Slug | SlugField | URL amigable |
| Descripción | TextField | Descripción de la categoría |
| Color | CharField(7) | Color hexadecimal |

---

### 4. Experiencia

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Experiencias | Experiencia laboral | Staff/Admin |
| Educaciones | Formación académica | Staff/Admin |

#### Experiencia - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Empresa | CharField(200) | Nombre de la empresa |
| Cargo | CharField(200) | Puesto desempeñ |
| Descripción | TextField | Funciones realizadas |
| Logo | ImageField | Logo de la empresa |
| Ubicación | CharField(200) | Ubicación de la empresa |
| URL Empresa | URLField | Sitio web de la empresa |
| Fecha inicio | DateField | Fecha de inicio |
| Fecha fin | DateField | Fecha de finalización |
| Actual | BooleanField | ¿Trabajo actual? |
| Orden | IntegerField | Orden de visualización |

#### Educación - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Institución | CharField(200) | Nombre de la institución |
| Título | CharField(200) | Título obtenido |
| Campo de estudio | CharField(200) | Carrera o especialización |
| Descripción | TextField | Descripción adicional |
| Logo | ImageField | Logo de la institución |
| Fecha inicio | DateField | Fecha de inicio |
| Fecha fin | DateField | Fecha de graduación |
| Actual | BooleanField | ¿En curso? |
| Orden | IntegerField | Orden de visualización |

---

### 5. Habilidades

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Habilidades | Habilidades técnicas y blandas | Staff/Admin |
| Categorías de Habilidad | Grupos de habilidades | Staff/Admin |

#### Habilidades - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Nombre | CharField(100) | Nombre de la habilidad |
| Icono | CharField(50) | Nombre del icono |
| Categoría | ForeignKey | Grupo al que pertenece |
| Nivel | IntegerField(0-100) | Nivel de proficiency |
| Descripción | TextField | Descripción de la habilidad |
| Años experiencia | DecimalField | Años de experiencia |
| Orden | IntegerField | Orden de visualización |

#### Categorías de Habilidad - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Nombre | CharField(100) | Nombre de la categoría |
| Icono | CharField(50) | Icono de la categoría |
| Orden | IntegerField | Orden de visualización |

---

### 6. Blog

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Artículos | Artículos del blog | Staff/Admin |
| Categorías de Blog | Categorías de artículos | Staff/Admin |

#### Artículos - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Título | CharField(200) | Título del artículo |
| Slug | SlugField | URL amigable |
| Resumen | CharField(300) | Resumen para SEO |
| Contenido | RichTextField | Contenido (CKEditor) |
| Imagen | ImageField | Imagen destacada |
| Categoría | ForeignKey | Categoría del artículo |
| Autor | ForeignKey | Autor del artículo |
| Etiquetas | JSONField | Lista de etiquetas |
| Meta título | CharField(60) | Título SEO |
| Meta descripción | CharField(160) | Descripción SEO |
| Publicado | BooleanField | ¿Publicar? |
| Destacado | BooleanField | ¿Artículo destacado? |
| Fecha publicación | DateTimeField | Fecha de publicación |

**Etiquetas (JSON):**

```json
["django", "python", "desarrollo-web", "tutorial"]
```

#### Configuración de CKEditor

El campo de contenido usa CKEditor con las siguientes herramientas:

| Categoría | Herramientas |
|-----------|---------------|
| Formato | Negrita, Cursiva, Subrayado, Tachado |
| Encabezados | H1, H2, H3, H4, H5, H6 |
| Listas | Numeradas, Con viñetas |
| Insertar | Enlace, Imagen, Video, Tabla |
| Código | Código fuente, Blockquote |
| Otros | Deshacer, Rehacer, Fuente, Tamaño |

---

### 7. Contacto

| Modelo | Descripción | Permisos |
|--------|-------------|----------|
| Mensajes de Contacto | Mensajes recibidos | Staff/Admin |

#### Mensajes de Contacto - Campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Nombre | CharField(200) | Nombre del remitente |
| Email | EmailField | Correo del remitente |
| Asunto | CharField(200) | Asunto del mensaje |
| Mensaje | TextField | Contenido del mensaje |
| Teléfono | CharField(20) | Teléfono de contacto |
| Leído | BooleanField | ¿Mensaje leído? |
| Contestado | BooleanField | ¿Ya se respondió? |
| Respuesta | TextField | Respuesta enviada |
| Creado | DateTimeField | Fecha de recepción |
| Actualizado | DateTimeField | Fecha de respuesta |

---

## ⚙️ Configuración del Admin

### Personalización

El admin de Django permite varias personalizaciones en [`backend/apps/<app>/admin.py`](../../backend/apps/):

```python
@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'destacado', 'publicado', 'orden', 'fecha_inicio']
    list_filter = ['publicado', 'destacado', 'categorias']
    search_fields = ['titulo', 'descripcion_corta']
    prepopulated_fields = {'slug': ('titulo',)}
    ordering = ['-destacado', '-orden', '-fecha_inicio']
```

---

## 📊 Mejores Prácticas

### Proyectos

1. ✅ Agregar imagen representativa de alta calidad
2. ✅ Incluir todas las tecnologías utilizadas
3. ✅ Agregar enlaces funcionales (demo y código)
4. ✅ Marcar proyectos destacados
5. ✅ Ordenar por prioridad
6. ✅ Usar slug descriptivo para URLs limpias

### Blog

1. ✅ Usar meta tags para SEO
2. ✅ Agregar imagen destacada adecuada
3. ✅ Seleccionar categorías apropiadas
4. ✅ Agregar etiquetas relevantes
5. ✅ Usar fecha futura para programar publicación
6. ✅ Revisar ortografía antes de publicar

### Perfil

1. ✅ Completar toda la información de contacto
2. ✅ Agregar foto de perfil profesional
3. ✅ Incluir CV actualizado
4. ✅ Configurar colores que reflejen tu marca personal
5. ✅ Completar meta tags para SEO

---

## 🔍 Búsqueda y Filtrado

### Búsqueda Global

Usa la barra de búsqueda en la parte superior para buscar cualquier contenido.

### Filtros en Listas

Cada modelo en el admin tiene filtros disponibles en la barra lateral:

| Modelo | Filtros Disponibles |
|--------|---------------------|
| Usuarios | is_active, is_staff, is_superuser |
| Proyectos | publicado, destacado, categorías |
| Artículos | publicado, destacado, categoría, autor |
| Experiencias | actual, fecha_inicio |
| Mensajes | leido, contestado |

---

## 📝 Acciones en Lote

Puedes realizar acciones en múltiples registros simultáneamente:

1. Selecciona los registros usando las casillas de verificación
2. Selecciona una acción del menú desplegable "Acción"
3. Haz clic en "Ir"

**Acciones comunes:**

| Acción | Descripción |
|--------|-------------|
| Eliminar seleccionados | Eliminar los registros seleccionados |
| Publicar | Marcar como publicados |
| Despublicar | Marcar como no publicados |

---

## ⚡ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + S` | Guardar y continuar editando |
| `Ctrl + Shift + S` | Guardar y agregar otro |
| `Ctrl + Enter` | Guardar y ver el objeto |

---

*¿Necesitas más ayuda? Consulta la documentación de la API o contacta al desarrollador.*
