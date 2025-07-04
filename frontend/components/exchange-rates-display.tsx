"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { RefreshCw } from "lucide-react"
import type { ExchangeRate } from "../lib/types"
import { getCurrencyByCode } from "../lib/currencies"

function formatFechaConDia(fechaISO: string) {
  if (!fechaISO) return "";
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const [anio, mes, dia] = fechaISO.split("-");
  const dateObj = new Date(Number(anio), Number(mes) - 1, Number(dia));
  const diaSemana = dias[dateObj.getDay()];
  return `${diaSemana}, ${dia}/${mes}/${anio}`;
}

export default function ExchangeRatesDisplay() {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [mounted, setMounted] = useState(false)
  const [rateDate, setRateDate] = useState<string>("")

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = await response.json()

      if (data.success) {
        setRates(data.rates)
        setLastUpdated(new Date().toLocaleTimeString("es-VE"))
        if (data.rates.length > 0 && data.rates[0].rateDate) {
          setRateDate(data.rates[0].rateDate)
        }
      }
    } catch (error) {
      console.error("Error al obtener tasas:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
    setMounted(true)
  }, [])

  const formatRate = (rate: number) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    }).format(rate)
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tasas de Cambio</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRates}
          disabled={loading}
          className="h-8 w-8 p-0 bg-transparent dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {rateDate && (
          <div className="text-center text-xs text-gray-700 dark:text-gray-300 pb-2">
            Tasas oficiales del BCV para el <b>{formatFechaConDia(rateDate)}</b>
          </div>
        )}
        {rates.map((rate) => {
          const fromCurrency = getCurrencyByCode(rate.from)
          const toCurrency = getCurrencyByCode(rate.to)

          if (!fromCurrency || !toCurrency) return null

          return (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{fromCurrency.flag}</span>
                <div>
                  <div className="font-medium text-sm text-gray-800 dark:text-gray-100">
                    {fromCurrency.code} → {toCurrency.code}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{fromCurrency.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600 dark:text-green-400">
                  {toCurrency.symbol}
                  {formatRate(rate.rate)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">por 1 {fromCurrency.symbol}</div>
              </div>
            </div>
          )
        })}

        {/* Si no hay tasas disponibles y no estamos cargando, mostramos un mensaje informativo */}
        {!loading && rates.length === 0 && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-300">No hay tasas disponibles en este momento.</p>
        )}

        {mounted && lastUpdated && <div className="text-center text-xs text-gray-500 dark:text-gray-300 pt-2">Actualizado: {lastUpdated}</div>}
      </CardContent>
    </Card>
  )
} 