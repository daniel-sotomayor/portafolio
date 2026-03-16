# 🗄️ Diagrama de Base de Datos

> **Última Actualización:** 2026-03-16

---

## 📊 Modelo Entidad-Relación

```
┌─────────────────┐       ┌─────────────────┐
│     Usuario     │       │     Perfil      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──1:1──│ id (PK)         │
│ username        │       │ usuario_id (FK) │
│ email           │       │ nombre_completo │
│ first_name      │       │ titulo_prof.    │
│ last_name       │       │ bio_corta       │
│ password        │       │ bio_larga       │
│ is_staff        │       │ email           │
│ is_active       │       │ telefono        │
│ is_superuser    │       │ ubicacion       │
│ ...             │       │ foto_perfil     │
└─────────────────┘       │ cv_pdf          │
                         │ color_primario  │
                         │ color_secundario│
                         │ ...             │
                         └─────────────────┘
                                 │
                                 │
┌─────────────────┐       ┌─────────────────┐
│   Categoria-   │       │    Proyecto    │
│    Proyecto    │       ├─────────────────┤
├─────────────────┤       │ id (PK)        │
│ id (PK)        │◄──M:N──│ titulo         │
│ nombre         │         │ slug           │
│ slug           │         │ descripcion... │
│ descripcion    │         │ imagen         │
│ color          │         │ url_demo       │
└─────────────────┘         │ url_codigo     │
                           │ tecnologias    │
┌─────────────────┐         │ fecha_inicio   │
│   Categoria-   │         │ destacado      │
│   Habilidad    │         │ publicado      │
├─────────────────┤         │ ...            │
│ id (PK)        │         └────────┬────────┘
│ nombre         │                  │
│ icono          │                  │
│ orden          │       ┌──────────┘
└────────┬────────┘       │
         │                │
    1:N  │                │
         ▼                ▼
┌──────────────────────────────────────────────┐
│                Habilidad                     │
├──────────────────────────────────────────────┤
│ id (PK)                                     │
│ nombre                                      │
│ icono                                       │
│ categoria_id (FK)                          │
│ nivel (0-100)                               │
│ anios_experiencia                          │
│ orden                                       │
└──────────────────────────────────────────────┘
```

---

## 📋 Tablas Principales

### Tabla: `usuarios_usuario`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | BigAutoField | PK |
| username | CharField(150) | Unique |
| email | EmailField | Unique |
| password | CharField(128) | - |
| is_staff | BooleanField | Default False |
| is_active | BooleanField | Default True |
| is_superuser | BooleanField | Default False |
| date_joined | DateTimeField | Auto |

---

### Tabla: `perfil_perfil`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | BigAutoField | PK |
| usuario_id | OneToOneField | FK → usuarios_usuario |
| nombre_completo | CharField(200) | - |
| titulo_profesional | CharField(200) | - |
| bio_corta | TextField(300) | - |
| bio_larga | TextField | - |
| email | EmailField | - |
| telefono | CharField(20) | Blank |
| ubicacion | CharField(200) | - |
| foto_perfil | ImageField | Null, Blank |
| cv_pdf | FileField | Null, Blank |
| color_primario | CharField(7) | Default #6366f1 |
| activo | BooleanField | Default True |

---

### Tabla: `proyectos_proyecto`

| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | BigAutoField | PK |
| titulo | CharField(200) | - |
| slug | SlugField | Unique |
| descripcion_corta | CharField(300) | - |
| descripcion_larga | TextField | - |
| imagen | ImageField | - |
| url_demo | URLField | Blank |
| url_codigo | URLField | Blank |
| tecnologias | JSONField | Default [] |
| fecha_inicio | DateField | - |
| fecha_fin | DateField | Null, Blank |
| destacado | BooleanField | Default False |
| publicado | BooleanField | Default True |

---

### Tablas de Relación

| Tabla | Tipo | Descripción |
|-------|------|-------------|
| `proyectos_proyecto_categorias` | M2M | Proyectos ↔ Categorías |
| `blog_articulo_categorias` | M2M | Artículos ↔ Categorías |
| `blog_articulo_etiquetas` | M2M | Artículos ↔ Etiquetas |

---

## 🔗 Relaciones Resumen

| Relación | Tipo | Descripción |
|----------|------|-------------|
| Usuario → Perfil | OneToOne | Un usuario tiene un perfil |
| Usuario → Articulo | OneToMany | Un usuario puede escribir muchos artículos |
| Proyecto → Categoria | ManyToMany | Un proyecto puede tener varias categorías |
| Habilidad → Categoria | ForeignKey | Una habilidad pertenece a una categoría |
| Articulo → Categoria | ForeignKey | Un artículo pertenece a una categoría |
