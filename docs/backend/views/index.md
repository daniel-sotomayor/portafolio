# 📡 Vistas del Backend - Índice

> **Última Actualización:** 2026-03-15

---

## 📋 Aplicaciones con Vistas

| App | ViewSet | Descripción |
|-----|---------|-------------|
| [Proyectos](proyectos.md) | `ProyectoViewSet` | CRUD de proyectos |
| [Proyectos](proyectos.md) | `CategoriaProyectoViewSet` | CRUD de categorías |
| [Perfil](perfil.md) | `PerfilViewSet` | CRUD de perfiles |
| [Experiencia](experiencia.md) | `ExperienciaViewSet` | CRUD de experiencias |
| [Experiencia](experiencia.md) | `EducacionViewSet` | CRUD de educación |
| [Habilidades](habilidades.md) | `HabilidadViewSet` | CRUD de habilidades |
| [Habilidades](habilidades.md) | `CategoriaHabilidadViewSet` | CRUD de categorías |
| [Blog](blog.md) | `ArticuloViewSet` | CRUD de artículos |
| [Blog](blog.md) | `CategoriaBlogViewSet` | CRUD de categorías |
| [Contacto](contacto.md) | `MensajeContactoViewSet` | CRUD de mensajes |
| [Usuarios](usuarios.md) | `UsuarioViewSet` | Gestión de usuarios |

---

## 🔄 Patrón de Vistas

Todas las aplicaciones utilizan **ViewSets** de Django REST Framework:

```python
class XxxViewSet(viewsets.ModelViewSet):
    queryset = Xxx.objects.all()
    serializer_class = XxxSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    lookup_field = 'slug'  # o 'pk'
```

---

## ⚙️ Permisos

| ViewSet | Lectura | Escritura |
|---------|---------|-----------|
| Proyectos | AllowAny | IsAuthenticated |
| Perfil | AllowAny | IsAuthenticated |
| Experiencia | AllowAny | IsAuthenticated |
| Habilidades | AllowAny | IsAuthenticated |
| Blog | AllowAny | IsAuthenticated |
| Contacto | IsAuthenticated | AllowAny |
| Usuarios | AllowAny | IsAuthenticated |
