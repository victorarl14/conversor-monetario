"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectItem } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp } from "lucide-react"
import { CURRENCIES } from "@/lib/currencies"
import type { ConversionResult } from "@/lib/types"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("VES")
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  const handleConvert = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setLoading(true)
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          fromCurrency,
          toCurrency,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.result)
        setLastUpdated(new Date().toLocaleTimeString("es-VE"))
      }
    } catch (error) {
      console.error("Error en la conversión:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  useEffect(() => {
    setMounted(true)
    if (amount && fromCurrency && toCurrency) {
      handleConvert()
    }
  }, [amount, fromCurrency, toCurrency])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Conversor de Monedas</CardTitle>
          <p className="text-sm text-gray-600">Tasas oficiales BCV</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cantidad a convertir */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Cantidad</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ingresa la cantidad"
              className="text-lg font-semibold text-center"
              min="0"
              step="0.01"
            />
          </div>

          {/* Moneda origen */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">De</label>
            <Select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
              {CURRENCIES.filter((c) => c.code !== "VES").map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Botón de intercambio */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapCurrencies}
              className="rounded-full h-10 w-10 border-2 hover:bg-blue-50 bg-transparent"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Moneda destino */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">A</label>
            <Select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
              <SelectItem value="VES">🇻🇪 VES - Bolívar Venezolano</SelectItem>
            </Select>
          </div>

          {/* Resultado */}
          {result && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{result.fromCurrency.flag}</span>
                  <span className="text-lg font-semibold">
                    {result.fromCurrency.symbol}
                    {formatNumber(result.amount)}
                  </span>
                  <span className="text-gray-500">=</span>
                  <span className="text-lg">{result.toCurrency.flag}</span>
                  <span className="text-xl font-bold text-green-600">
                    {result.toCurrency.symbol}
                    {formatNumber(result.convertedAmount)}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  Tasa: 1 {result.fromCurrency.code} = {formatNumber(result.rate)} {result.toCurrency.code}
                </div>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="text-center space-y-2">
            {mounted && lastUpdated && <p className="text-xs text-gray-500">Última actualización: {lastUpdated}</p>}
            <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>Tasas oficiales del BCV</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 