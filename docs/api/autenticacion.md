# 🔐 Guía de Autenticación JWT

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-15

---

## 📝 Introducción

El sistema de Portafolio utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios. Esta guía detalla cómo implementar la autenticación en tus aplicaciones cliente.

---

## 🔑 Conceptos Básicos

### Tokens JWT

| Token | Uso | Duración |
|-------|-----|----------|
| **Access Token** | Autorización de requests | 60 minutos |
| **Refresh Token** | Renovación del access token | 7 días |

### Flujo de Autenticación

```
1. Usuario → Login (username/password) → Servidor
2. Servidor → Access Token + Refresh Token → Usuario
3. Usuario → Access Token → API Requests
4. (Si expira) → Refresh Token → Nuevo Access Token
```

---

## 🚀 Implementación

### 1. Iniciar Sesión

```bash
POST /api/usuarios/login/
Content-Type: application/json

{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

**Respuesta Exitosa (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@ejemplo.com",
    "first_name": "Admin",
    "last_name": "User"
  }
}
```

**Respuesta de Error (401):**
```json
{
  "detail": "No active account found with the given credentials"
}
```

---

### 2. Usar el Token

Incluye el token en el header de cada request:

```bash
GET /api/proyectos/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

---

### 3. Refrescar el Token

Cuando el access token expire, usa el refresh token:

```bash
POST /api/usuarios/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Respuesta:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

---

### 4. Cerrar Sesión

```bash
POST /api/usuarios/logout/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "refresh": "tu_refresh_token"
}
```

---

## 💻 Ejemplo en JavaScript/TypeScript

### Axios Setup

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/api/usuarios/refresh/', {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🔧 Configuración (Backend)

### Settings.py

```python
# Configuración JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## ⚠️ Mejores Prácticas

| Práctica | Descripción |
|----------|-------------|
| ✅ HTTPS | Siempre usa HTTPS en producción |
| ✅ Tokens en HTTPOnly Cookies | Considera usar cookies seguras |
| ✅ Refresh Token Rotation | Rota el refresh token en cada uso |
| ✅ Blacklist | Lista negra para tokens invalidate |
| ❌ No expongas tokens | No guardes tokens en localStorage en producción |

---

## 📱 React Native / Mobile

Para aplicaciones móviles, considera almacenar los tokens de forma segura:

```typescript
// React Native - SecureStore
import * as SecureStore from 'expo-secure-store';

async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}
```

---

## 🔄 Renovación Automática

### Implementación Recomendada

```typescript
// Hook personalizado para auth
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await getToken('access_token');
      if (accessToken) {
        // Verificar si el token aún es válido
        const isExpired = isTokenExpired(accessToken);
        if (isExpired) {
          await refreshAccessToken();
        }
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);
  
  return { isAuthenticated };
}
```

---

## ❓ Preguntas Frecuentes

### ¿Qué pasa si el refresh token expira?
El usuario deberá iniciar sesión nuevamente.

### ¿Cómo invalido un token específico?
Usa el endpoint de logout o agrega el token a la blacklist.

### ¿Puedo tener múltiples dispositivos?
Sí, cada dispositivo tendrá sus propios tokens.
