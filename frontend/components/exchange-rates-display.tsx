"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import type { ExchangeRate } from "@/lib/types"
import { getCurrencyByCode } from "@/lib/currencies"

export default function ExchangeRatesDisplay() {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = await response.json()

      if (data.success) {
        setRates(data.rates)
        setLastUpdated(new Date().toLocaleTimeString("es-VE"))
      }
    } catch (error) {
      console.error("Error al obtener tasas:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

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
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRates}
          disabled={loading}
          className="h-8 w-8 p-0 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
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

        {/* Si no hay tasas disponibles y no estamos cargando, mostramos un mensaje informativo */}
        {!loading && rates.length === 0 && (
          <p className="text-center text-sm text-gray-500">No hay tasas disponibles en este momento.</p>
        )}

        {lastUpdated && <div className="text-center text-xs text-gray-500 pt-2">Actualizado: {lastUpdated}</div>}
      </CardContent>
    </Card>
  )
} 