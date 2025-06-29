# Cambio Oficial - Conversor de Monedas

Aplicación web para convertir monedas usando las tasas oficiales del Banco Central de Venezuela (BCV).

## 🏗️ Estructura del Proyecto

El proyecto está organizado en dos carpetas principales:

```
Landing_page_test_tecnico/
├── frontend/          # Aplicación Next.js (React + TypeScript)
└── backend/           # API NestJS (Node.js + TypeScript)
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes de interfaz
- **Lucide React** - Iconos

### Backend
- **NestJS** - Framework de Node.js
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP

## 📦 Instalación y Configuración

### 1. Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

## 🏃‍♂️ Ejecutar el Proyecto

### Frontend (Puerto 3000)

```bash
cd frontend
npm run dev
```

### Backend (Puerto 3001)

```bash
cd backend
npm run start:dev
```

## 🌐 Endpoints de la API

### Backend (NestJS)

- `GET /api/currency/currencies` - Obtener lista de monedas disponibles
- `GET /api/currency/exchange-rates` - Obtener tasas de cambio actuales
- `POST /api/currency/convert` - Convertir monedas

### Frontend (Next.js)

- `/` - Página principal con el conversor
- `/api/convert` - Proxy al backend para conversiones
- `/api/exchange-rates` - Proxy al backend para tasas

## 🔧 Configuración de Desarrollo

### Variables de Entorno

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://conversor-backend-mceg.onrender.com/api
```

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
```

## 📱 Funcionalidades

- ✅ Conversión de monedas en tiempo real
- ✅ Tasas oficiales del BCV
- ✅ Interfaz responsive y moderna
- ✅ Múltiples monedas soportadas (USD, EUR, GBP, CNY, VES)
- ✅ Historial de conversiones
- ✅ Actualización automática de tasas

## 🎨 Características de la UI

- Diseño moderno y limpio
- Gradientes y efectos visuales
- Componentes reutilizables
- Animaciones suaves
- Modo oscuro/claro (preparado)
- Responsive design

## 📊 Monedas Soportadas

- 🇺🇸 **USD** - Dólar Estadounidense
- 🇪🇺 **EUR** - Euro
- 🇨🇳 **CNY** - Yuan Chino
- 🇹🇷 **TRY** - Lira Turca
- 🇷🇺 **RUB** - Rublo Ruso
- 🇻🇪 **VES** - Bolívar Venezolano

## 🔄 Flujo de Datos

1. **Frontend** solicita conversión al usuario
2. **Frontend** envía petición al **Backend**
3. **Backend** procesa la conversión usando tasas oficiales
4. **Backend** retorna el resultado al **Frontend**
5. **Frontend** muestra el resultado al usuario

## 🚀 Despliegue

### Frontend (Vercel)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
npm run start:prod
```

## 🚀 Despliegue en Render

Este proyecto está preparado para desplegarse fácilmente en [Render](https://render.com) usando el archivo `render.yaml` incluido en el repositorio.

### 1. Requisitos previos
- Tener una cuenta en Render.
- Tener el repositorio en GitHub.

### 2. Despliegue del Backend (NestJS)
- Render detectará el servicio backend desde el blueprint `render.yaml`.
- El backend se desplegará como un servicio web Node.js.
- Configura las variables de entorno para la base de datos PostgreSQL (puedes usar el panel de Render para crear una base de datos y copiar las variables de conexión: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`).
- El backend se expone en el puerto 3001 y tiene un health check en `/api/currency/currencies`.

### 3. Despliegue del Frontend (Next.js)
- Render detectará el servicio frontend desde el blueprint `render.yaml`.
- El frontend se desplegará como un servicio web Node.js.
- Configura la variable de entorno `NEXT_PUBLIC_API_URL` para que apunte a la URL pública del backend en Render (por ejemplo, `https://conversor-backend-xxxx.onrender.com/api`).

### 4. Despliegue de la Base de Datos
- Puedes crear una base de datos PostgreSQL directamente desde el panel de Render.
- Render te dará las variables de conexión necesarias para el backend.

### 5. Proceso automático
- Render lee el archivo `render.yaml` y crea ambos servicios (frontend y backend) automáticamente.
- Cada push a la rama principal del repositorio dispara un nuevo deploy.

### 6. Acceso
- El frontend estará disponible en una URL pública de Render (por ejemplo, `https://conversor-frontend-xxxx.onrender.com`).
- El backend estará disponible en su propia URL pública de Render.

---

¿Dudas? Consulta la documentación oficial de Render o revisa el archivo `render.yaml` para ver la configuración exacta.

## 📝 Notas

- Las tasas de cambio son simuladas para demostración
- En producción, se integraría con la API oficial del BCV
- El proyecto está preparado para escalabilidad
- CORS configurado para desarrollo local

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤖 Asistencia de IA

Este proyecto fue desarrollado con la ayuda de herramientas de inteligencia artificial:
- **Vercel AI** para generación y mejora de código.
- **Cursor** como editor asistido por IA para acelerar el desarrollo y depuración.
- **Extensión de Figma** para generación y exportación rápida de componentes visuales.
