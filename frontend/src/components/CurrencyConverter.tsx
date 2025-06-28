"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp, AlertCircle } from "lucide-react"
import { useCurrencyConverter } from "../hooks/useCurrencyConverter"

const CURRENCIES = [
  { code: "USD", name: "Dólar Estadounidense", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", flag: "🇬🇧" },
  { code: "CNY", name: "Yuan Chino", symbol: "¥", flag: "🇨🇳" },
  { code: "VES", name: "Bolívar Venezolano", symbol: "Bs.", flag: "🇻🇪" },
]

export default function CurrencyConverter() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    loading,
    error,
    swapCurrencies,
  } = useCurrencyConverter()

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
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.filter((c) => c.code !== "VES").map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-sm text-gray-600">{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón de intercambio */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full h-10 w-10 border-2 hover:bg-blue-50 bg-transparent"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Moneda destino */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">A</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VES">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🇻🇪</span>
                    <span className="font-medium">VES</span>
                    <span className="text-sm text-gray-600">Bolívar Venezolano</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Convirtiendo...</p>
            </div>
          )}

          {/* Resultado */}
          {result && !loading && (
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
