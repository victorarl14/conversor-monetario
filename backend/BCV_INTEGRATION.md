# Integración con Banco Central de Venezuela (BCV)

## Descripción

Este proyecto ahora incluye integración con el Banco Central de Venezuela para obtener las tasas de cambio oficiales en tiempo real. La integración utiliza web scraping de la página oficial del BCV (`https://www.bcv.org.ve/`) para obtener las tasas más actualizadas.

## Características

- **Tasas oficiales**: Obtiene las tasas directamente del BCV
- **Caché inteligente**: Las tasas se cachean por 1 hora para evitar múltiples requests
- **Fallback**: Si el BCV no está disponible, usa tasas de respaldo
- **Logging**: Registra todas las operaciones para debugging
- **Múltiples monedas**: Soporta USD, EUR, CNY, TRY, RUB y VES

## Nuevos Endpoints

### 1. Obtener tasas oficiales del BCV
```
GET /currency/official-bcv-rates
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "rates": [
      {
        "currency": "USD",
        "rate": 36.85,
        "date": "2024-01-15"
      },
      {
        "currency": "EUR", 
        "rate": 40.12,
        "date": "2024-01-15"
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "source": "Banco Central de Venezuela (BCV)"
  },
  "message": "Tasas oficiales del Banco Central de Venezuela"
}
```

### 2. Endpoints específicos del BCV
```
GET /bcv/official-rates    # Todas las tasas oficiales
GET /bcv/usd-rate         # Solo tasa USD/VES
GET /bcv/eur-rate         # Solo tasa EUR/VES
POST /bcv/clear-cache     # Limpiar caché
```

## Conversiones con tasas oficiales

El endpoint de conversión ahora usa automáticamente las tasas oficiales del BCV:

```
POST /currency/convert
{
  "amount": 100,
  "fromCurrency": "USD",
  "toCurrency": "VES"
}
```

## Monedas soportadas

- **USD**: Dólar Estadounidense
- **EUR**: Euro
- **CNY**: Yuan Chino
- **TRY**: Lira Turca
- **RUB**: Rublo Ruso
- **VES**: Bolívar Venezolano (moneda base)

## Caché

- **Duración**: 1 hora
- **Ventajas**: Reduce la carga al BCV y mejora el rendimiento
- **Gestión**: Se puede limpiar manualmente con `POST /bcv/clear-cache`

## Manejo de errores

Si el BCV no está disponible:
1. Se intenta usar datos en caché (aunque hayan expirado)
2. Si no hay caché, se usan tasas de respaldo hardcodeadas
3. Se registra el error en los logs

## Logs

El sistema registra:
- Intentos de obtención de tasas
- Uso de caché
- Errores de scraping
- Conversiones realizadas

## Dependencias

- `axios`: Para requests HTTP
- `cheerio`: Para parsing de HTML (equivalente a lxml en Python)

## Notas técnicas

- El scraping se basa en la estructura HTML del sitio del BCV
- Se incluye User-Agent para evitar bloqueos
- Timeout de 30 segundos para requests
- Manejo robusto de errores de parsing 