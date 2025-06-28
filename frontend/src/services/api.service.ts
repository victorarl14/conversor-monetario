import type { ApiResponse, ExchangeRate, ConversionResult } from "../types/api.types"

const API_BASE_URL = process.env.NODE_ENV === "production" ? "https://tu-dominio.com/api" : "http://localhost:3000/api"

export class ApiService {
  private static async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: "Error de conexión con el servidor",
      }
    }
  }

  static async getCurrencies() {
    return this.request("/currencies")
  }

  static async getExchangeRates(): Promise<ApiResponse<ExchangeRate[]>> {
    return this.request("/exchange-rates")
  }

  static async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<ApiResponse<ConversionResult>> {
    return this.request("/convert", {
      method: "POST",
      body: JSON.stringify({
        amount,
        fromCurrency,
        toCurrency,
      }),
    })
  }
}
