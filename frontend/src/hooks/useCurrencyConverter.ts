"use client"

import { useState, useEffect } from "react"
import { ApiService } from "../services/api.service"
import type { ConversionResult } from "../types/api.types"

export function useCurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("VES")
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const convertCurrency = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setLoading(true)
    setError(null)

    try {
      const response = await ApiService.convertCurrency(Number.parseFloat(amount), fromCurrency, toCurrency)

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Error en la conversión")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const timeoutId = setTimeout(convertCurrency, 500) // Debounce
      return () => clearTimeout(timeoutId)
    }
  }, [amount, fromCurrency, toCurrency])

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    loading,
    error,
    convertCurrency,
    swapCurrencies,
  }
}
