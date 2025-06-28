# Frontend - Al Cambio VE

Aplicación Next.js para el conversor de monedas Al Cambio VE.

## 🚀 Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes de interfaz
- **Lucide React** - Iconos

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura

```
frontend/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI (Radix)
│   ├── currency-converter.tsx
│   └── exchange-rates-display.tsx
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y tipos
└── public/               # Archivos estáticos
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting del código

## 🌐 Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📱 Componentes Principales

### CurrencyConverter
Componente principal para convertir monedas.

### ExchangeRatesDisplay
Componente para mostrar las tasas de cambio actuales.

## 🎨 Estilos

El proyecto usa Tailwind CSS con configuración personalizada en `tailwind.config.ts`.

## 🔗 API Integration

El frontend se comunica con el backend a través de:
- `/api/convert` - Conversiones de monedas
- `/api/exchange-rates` - Tasas de cambio

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
```

### Otros
```bash
npm run build
npm run start
``` 