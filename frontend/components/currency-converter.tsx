"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectItem } from "./ui/select"
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

  function FormattedNumber({ num }: { num: number | string }) {
    const [formatted, setFormatted] = useState<string>("");
    useEffect(() => {
      let n = typeof num === 'string' ? Number(num) : num;
      if (isNaN(n)) {
        setFormatted("");
        return;
      }
      setFormatted(
        n.toLocaleString('en-US', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 8,
        })
          .replace(/(\.\d*?[1-9])0+$/, '$1')
          .replace(/\.$/, '')
      );
    }, [num]);
    if (!formatted) return null;
    return <>{formatted}</>;
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Conversor de Monedas</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">Tasas oficiales BCV</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cantidad a convertir */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Cantidad</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 20) return;
                if (/^\d*(\.?\d{0,8})?$/.test(value)) {
                  setAmount(value);
                }
              }}
              placeholder="Ingresa la cantidad"
              className="text-lg font-semibold text-center dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              min="0"
              step="0.00000001"
              maxLength={20}
            />
          </div>

          {/* Moneda origen */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">De</label>
            <Select value={fromCurrency} onChange={e => {
              const value = e.target.value;
              setFromCurrency(value);
              // Si el nuevo origen es VES, el destino debe ser la primera moneda distinta de VES
              if (value === 'VES') {
                const firstNonVES = CURRENCIES.find(c => c.code !== 'VES');
                if (firstNonVES) setToCurrency(firstNonVES.code);
              } else {
                setToCurrency('VES');
              }
            }}>
              {CURRENCIES.map((currency) => (
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
              onClick={() => {
                // Solo permitir swap entre VES y otra moneda
                if (fromCurrency === 'VES') {
                  setFromCurrency(toCurrency);
                  setToCurrency('VES');
                } else if (toCurrency === 'VES') {
                  setToCurrency(fromCurrency);
                  setFromCurrency('VES');
                }
              }}
              className="rounded-full h-10 w-10 border-2 hover:bg-blue-50 bg-transparent dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Moneda destino */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">A</label>
            <Select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
              {fromCurrency === 'VES'
                ? CURRENCIES.filter(c => c.code !== 'VES').map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </SelectItem>
                  ))
                : [
                    <SelectItem key="VES" value="VES">
                      VE VES - Bolívar Venezolano
                    </SelectItem>
                  ]}
            </Select>
          </div>

          {/* Resultado */}
          {result && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
              <div className="text-center space-y-2">
                <div className="flex flex-col items-center justify-center space-y-2 break-all">
                  <span className="text-lg font-semibold break-all text-gray-800 dark:text-gray-100" style={{ wordBreak: 'break-all' }}>
                    {result.fromCurrency.flag} <FormattedNumber num={result.amount} />
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">=</span>
                  <span className="text-xl font-bold text-green-600 break-all" style={{ wordBreak: 'break-all' }}>
                    {result.toCurrency.flag} <FormattedNumber num={result.convertedAmount} />
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Tasa: 1 {result.fromCurrency.code} = <FormattedNumber num={result.rate} /> {result.toCurrency.code}
                </div>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="text-center space-y-2">
            {mounted && lastUpdated && <p className="text-xs text-gray-500 dark:text-gray-300">Última actualización: {lastUpdated}</p>}
            <div className="flex items-center justify-center space-x-1 text-xs text-green-600 dark:text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>Tasas oficiales del BCV</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 