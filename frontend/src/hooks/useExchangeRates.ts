"use client"

import { useState, useEffect } from "react"
import { ApiService } from "../services/api.service"
import type { ExchangeRate } from "../types/api.types"

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchRates = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await ApiService.getExchangeRates()

      if (response.success && response.data) {
        setRates(response.data)
        setLastUpdated(new Date().toLocaleTimeString("es-VE"))
      } else {
        setError(response.error || "Error al obtener las tasas")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  return {
    rates,
    loading,
    error,
    lastUpdated,
    refetch: fetchRates,
  }
}
