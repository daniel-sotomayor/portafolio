# 🔒 Validaciones y Estándares de Seguridad

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-16

---


## 📋 Resumen de Seguridad

Este documento describe las validaciones y medidas de seguridad implementadas en el proyecto Portafolio Profesional, alineadas con las recomendaciones OWASP Top 10.

---

## 🛡️ Medidas de Seguridad Implementadas

### OWASP Top 10 - Protecciones

| Código | Vulnerabilidad | Protección Implementada |
|--------|---------------|----------------------|
| A1:2017 | Injection | Sanitización en serializers, Django ORM |
| A2:2017 | Broken Auth | JWT con tokens de acceso y refresh |
| A3:2017 | Sensitive Data Exposure | Campos protegidos en serializers |
| A4:2017 | XXE | Django XML parser seguro por defecto |
| A5:2017 | Broken Access Control | Permisos en ViewSets |
| A6:2017 | Security Misconfiguration | Headers de seguridad en Vite |
| A7:2017 | XSS | Sanitización en frontend y backend |
| A8:2017 | Insecure Deserialization | Django REST Framework seguro |
| A9:2017 | Using Components with Known Vulnerabilities | Dependencias actualizadas |
| A10:2017 | Insufficient Logging | Configuración de logging |

---

## ✅ Validaciones del Backend

### 1. Autenticación JWT

**Archivo:** `backend/apps/usuarios/serializers.py`

```python
# Validación de contraseña segura
password = serializers.CharField(
    write_only=True, 
    required=True, 
    validators=[validate_password]  # Django password validators
)

# Confirmación de contraseña
def validate(self, attrs):
    if attrs['password'] != attrs['password_confirm']:
        raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
    return attrs
```

**Validadores de contraseña (settings.py):**
- `UserAttributeSimilarityValidator` - Evita contraseñas similares al usuario
- `MinimumLengthValidator` - Mínimo 8 caracteres
- `CommonPasswordValidator` - Evita contraseñas comunes
- `NumericPasswordValidator` - Evita contraseñas solo numéricas

---

### 2. Serializer de Contacto

**Archivo:** `backend/apps/contacto/serializers.py`

```python
class MensajeContactoCreateSerializer(serializers.ModelSerializer):
    """
    Validaciones implementadas:
    - OWASP A1: Injection - Sanitización de entrada
    - OWASP A7: Missing Function Level Access Control
    """
    
    # Validaciones de longitud
    nombre = serializers.CharField(max_length=200, min_length=2)
    email = serializers.EmailField(max_length=254, required=True)
    asunto = serializers.CharField(max_length=200, min_length=5)
    mensaje = serializers.CharField(min_length=10, max_length=5000)
    
    def validate_nombre(self, value):
        """Sanitizar para prevenir XSS"""
        sanitized = value.replace('<', '').replace('>', '')
        return sanitized.strip()
    
    def validate_mensaje(self, value):
        """Sanitizar mensaje para prevenir XSS"""
        sanitized = value.replace('<script', '').replace('</script>', '')
        return sanitized.strip()
```

---

### 3. Permisos en ViewSets

**Archivo:** `backend/apps/proyectos/views.py`

```python
def get_permissions(self):
    if self.action in ['create', 'update', 'partial_update', 'destroy']:
        return [permissions.IsAuthenticated()]
    return [permissions.AllowAny()]
```

---

### 4. Serializer Público vs Privado

**Archivo:** `backend/apps/perfil/serializers.py`

```python
class PerfilPublicSerializer(serializers.ModelSerializer):
    """
    Serializer público para el perfil (sin datos sensibles)
    """
    class Meta:
        model = Perfil
        fields = [
            'nombre_completo', 'titulo_profesional', 'bio_corta',
            # Solo campos públicos - sin datos sensibles
        ]
```

---

## 🎨 Validaciones del Frontend

### 1. Sanitización de Entrada

**Archivo:** `frontend/src/pages/Contact.tsx`

```typescript
/**
 * OWASP A7:2017 - Missing Function Level Access Control
 * Sanitización de entrada para prevenir XSS
 */
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')           // Remover caracteres peligrosos
    .replace(/javascript:/gi, '')  // Prevenir JS injection
    .replace(/on\w+=/gi, '')       // Prevenir event handlers
    .trim()
}

/**
 * Validación de email según OWASP
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

---

### 2. Validación de Formulario

```typescript
const validateForm = (): boolean => {
  const errors: FormErrors = {}
  
  // Validar nombre
  if (!formData.name || formData.name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }
  
  // Validar email
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Ingrese un email válido'
  }
  
  // Validar mensaje
  if (!formData.message || formData.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
  }
  
  setErrors(errors)
  return Object.keys(errors).length === 0
}
```

---

## 🔧 Configuración de Seguridad

### Headers de Seguridad (Vite)

**Archivo:** `frontend/vite.config.ts`

```typescript
headers: {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}
```

---

## 📊 Validaciones de Datos

| Campo | Tipo | Validaciones |
|-------|------|-------------|
| `nombre` | CharField | Min: 2, Max: 200 caracteres |
| `email` | EmailField | Formato válido, max 254 caracteres |
| `telefono` | CharField | Max: 20 caracteres |
| `asunto` | CharField | Min: 5, Max: 200 caracteres |
| `mensaje` | TextField | Min: 10, Max: 5000 caracteres |
| `password` | CharField | Min: 8, sin similaridad, no común |
| `username` | CharField | Unique, alphanumeric |

---

## 🔐 Permisos de API

| Endpoint | Método | Permiso | Descripción |
|----------|--------|---------|-------------|
| `/api/proyectos/` | GET | AllowAny | Ver proyectos |
| `/api/proyectos/` | POST | IsAuthenticated | Crear proyecto |
| `/api/perfil/public/` | GET | AllowAny | Ver perfil público |
| `/api/perfil/` | POST | IsAuthenticated | Crear perfil |
| `/api/contacto/enviar/` | POST | AllowAny | Enviar mensaje |
| `/api/contacto/` | GET | IsAuthenticated | Ver mensajes |

---

## 📝 Recomendaciones de Seguridad

### Para Desarrolladores

1. ✅ Siempre sanitizar datos del usuario
2. ✅ Usar ORM de Django para consultas
3. ✅ Implementar rate limiting en producción
4. ✅ Usar HTTPS en producción
5. ✅ Mantener dependencias actualizadas
6. ✅ No exponer datos sensibles en logs

### Para Producción

1. ✅ Configurar `DEBUG=False`
2. ✅ Usar variables de entorno para secrets
3. ✅ Configurar CORS apropiadamente
4. ✅ Implementar rate limiting
5. ✅ Usar CDN para archivos estáticos
6. ✅ Configurar backups automáticos

---

## 🧪 Testing de Seguridad

```bash
# Verificar dependencias vulnerables
npm audit

# Verificar seguridad de Django
python manage.py check --deploy

# Verificar configuración
python manage.py check
```

---

## 📞 Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, por favor repórtala a través del formulario de contacto del portafolio.
