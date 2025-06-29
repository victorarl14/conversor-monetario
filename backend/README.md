# Backend - Al Cambio VE

API NestJS para el conversor de monedas Al Cambio VE.

## 🚀 Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Desarrollo

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3001`

## 🏗️ Estructura

```
backend/
├── src/
│   ├── controllers/       # Controladores de rutas
│   │   └── currency.controller.ts
│   ├── services/          # Lógica de negocio
│   │   └── currency.service.ts
│   ├── types/            # Tipos TypeScript
│   │   └── currency.types.ts
│   ├── app.module.ts     # Módulo principal
│   └── main.ts           # Punto de entrada
├── nest-cli.json         # Configuración de NestJS
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias
```

## 🔧 Scripts Disponibles

- `npm run start:dev` - Servidor de desarrollo con hot reload
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run start:debug` - Servidor con debugging
- `npm run test` - Ejecutar tests
- `npm run lint` - Linting del código

## 🌐 Endpoints

### Monedas
- `GET /api/currency/currencies` - Obtener lista de monedas disponibles

### Tasas de Cambio
- `GET /api/currency/exchange-rates` - Obtener tasas de cambio actuales

### Conversión
- `POST /api/currency/convert` - Convertir monedas

#### Ejemplo de conversión:
```json
{
  "amount": 100,
  "fromCurrency": "USD",
  "toCurrency": "VES"
}
```

## 🔧 Variables de Entorno

Crea un archivo `.env`:

```env
PORT=3001
NODE_ENV=development
```

## 📊 Monedas Soportadas

- **USD** - Dólar Estadounidense
- **EUR** - Euro
- **CNY** - Yuan Chino
- **TRY** - Lira Turca
- **RUB** - Rublo Ruso
- **VES** - Bolívar Venezolano

## 🔒 CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:3000` (Frontend)
- `http://localhost:3001` (Backend)

## 🧪 Testing

```bash
npm run test
npm run test:watch
npm run test:cov
```

## 🚀 Despliegue

### Railway/Render
```bash
npm run build
npm run start:prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

## 🚀 Despliegue en Render

Este backend está preparado para desplegarse en [Render](https://render.com) usando el archivo `render.yaml` del repositorio.

### 1. Despliegue automático
- Render detecta el servicio backend desde el blueprint `render.yaml`.
- El backend se despliega como un servicio web Node.js.
- El build y start se hacen automáticamente (`npm run build` y `npm run start:prod`).

### 2. Configuración de la base de datos
- Puedes crear una base de datos PostgreSQL desde el panel de Render.
- Render te dará las variables de conexión (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`).
- Agrega estas variables de entorno en la configuración del servicio backend en Render.

### 3. Variables de entorno
- Asegúrate de tener configuradas todas las variables necesarias en Render para el backend.
- El backend se expone en el puerto 3001 y tiene un health check en `/api/currency/currencies`.

### 4. Acceso
- El backend estará disponible en una URL pública de Render (por ejemplo, `https://conversor-backend-xxxx.onrender.com`).

---

¿Dudas? Consulta la documentación oficial de Render o revisa el archivo `render.yaml` para ver la configuración exacta.

## 📝 Notas

- Las tasas de cambio son simuladas para demostración
- En producción, se integraría con la API oficial del BCV
- El servicio está preparado para escalabilidad
- Manejo de errores implementado con HttpException 

## 🤖 Asistencia de IA

Este backend fue desarrollado con la ayuda de herramientas de inteligencia artificial:
- **Vercel AI** para generación y mejora de código.
- **Cursor** como editor asistido por IA para acelerar el desarrollo y depuración.
- **Extensión de Figma** para generación y exportación rápida de componentes visuales. 