# 📖 Manual de Instalación

> **Versión:** 1.0.0  
> **Última Actualización:** 2026-03-15

---

## 🚀 Requisitos Previos

| Requisito | Versión Mínima |
|-----------|----------------|
| Python | 3.10+ |
| Node.js | 18+ |
| PostgreSQL | 14+ |
| Git | 2.0+ |

---

## 🛠️ Instalación del Backend

### 1. Clonar el Repositorio

```bash
git clone https://github.com/usuario/portafolio.git
cd portafolio
```

### 2. Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv venv

# Activar (Linux/Mac)
source venv/bin/activate

# Activar (Windows)
venv\Scripts\activate
```

### 3. Instalar Dependencias

```bash
cd backend
pip install -r requirements.txt
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en `backend/`:

```env
# Django
SECRET_KEY=tu-secret-key-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos
DB_NAME=portafolio_db
DB_USER=postgres_user
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432

# Email (opcional)
EMAIL_HOST_USER=tu@email.com
EMAIL_HOST_PASSWORD=tu_password
```

### 5. Migraciones

```bash
python manage.py migrate
```

### 6. Crear Super Usuario

```bash
python manage.py createsuperuser
```

### 7. Ejecutar Servidor

```bash
python manage.py runserver
```

---

## 🎨 Instalación del Frontend

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:8000
VITE_SITE_NAME=Mi Portafolio
VITE_OWNER_NAME=Tu Nombre
VITE_OWNER_TITLE=Desarrollador Full Stack
VITE_CONTACT_EMAIL=tu@email.com
```

### 3. Ejecutar Servidor de Desarrollo

```bash
npm run dev
```

---

## 🐳 Docker (Opcional)

### Dockerfile Backend

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: portafolio_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DEBUG=True
      - DB_HOST=db
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

---

## ✅ Verificación

### Backend
- Acceder a `http://localhost:8000/api/docs/`
- Verificar Swagger UI

### Frontend
- Acceder a `http://localhost:5173`
- Verificar que carga correctamente
