"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle } from "lucide-react"
import { useExchangeRates } from "../hooks/useExchangeRates"

const CURRENCIES = [
  { code: "USD", name: "Dólar Estadounidense", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", flag: "🇬🇧" },
  { code: "CNY", name: "Yuan Chino", symbol: "¥", flag: "🇨🇳" },
  { code: "VES", name: "Bolívar Venezolano", symbol: "Bs.", flag: "🇻🇪" },
]

export default function ExchangeRatesDisplay() {
  const { rates, loading, error, lastUpdated, refetch } = useExchangeRates()

  const getCurrencyByCode = (code: string) => {
    return CURRENCIES.find((currency) => currency.code === code)
  }

  const formatRate = (rate: number) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rate)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Tasas de Cambio</CardTitle>
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="h-8 w-8 p-0 bg-transparent">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {error && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {loading && rates.length === 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Cargando tasas...</p>
          </div>
        )}

        {rates.map((rate) => {
          const fromCurrency = getCurrencyByCode(rate.from)
          const toCurrency = getCurrencyByCode(rate.to)

          if (!fromCurrency || !toCurrency) return null

          return (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{fromCurrency.flag}</span>
                <div>
                  <div className="font-medium text-sm">
                    {fromCurrency.code} → {toCurrency.code}
                  </div>
                  <div className="text-xs text-gray-600">{fromCurrency.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {toCurrency.symbol}
                  {formatRate(rate.rate)}
                </div>
                <div className="text-xs text-gray-500">por 1 {fromCurrency.symbol}</div>
              </div>
            </div>
          )
        })}

        {lastUpdated && <div className="text-center text-xs text-gray-500 pt-2">Actualizado: {lastUpdated}</div>}
      </CardContent>
    </Card>
  )
}
