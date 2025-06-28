import { Injectable } from '@nestjs/common';
import type { Currency, ExchangeRate, ConversionResult } from "../types/currency.types"

@Injectable()
export class CurrencyService {
  private readonly CURRENCIES: Currency[] = [
    {
      code: "USD",
      name: "Dólar Estadounidense",
      symbol: "$",
      flag: "🇺🇸",
    },
    {
      code: "EUR",
      name: "Euro",
      symbol: "€",
      flag: "🇪🇺",
    },
    {
      code: "GBP",
      name: "Libra Esterlina",
      symbol: "£",
      flag: "🇬🇧",
    },
    {
      code: "CNY",
      name: "Yuan Chino",
      symbol: "¥",
      flag: "🇨🇳",
    },
    {
      code: "VES",
      name: "Bolívar Venezolano",
      symbol: "Bs.",
      flag: "🇻🇪",
    },
  ]

  private readonly EXCHANGE_RATES: Record<string, number> = {
    "USD-VES": 36.5,
    "EUR-VES": 39.85,
    "GBP-VES": 46.2,
    "CNY-VES": 5.15,
    "VES-USD": 1 / 36.5,
    "VES-EUR": 1 / 39.85,
    "VES-GBP": 1 / 46.2,
    "VES-CNY": 1 / 5.15,
  }

  getCurrencies(): Currency[] {
    return this.CURRENCIES
  }

  getCurrencyByCode(code: string): Currency | undefined {
    return this.CURRENCIES.find((currency) => currency.code === code)
  }

  async getExchangeRates(): Promise<ExchangeRate[]> {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const rates: ExchangeRate[] = [
      {
        from: "USD",
        to: "VES",
        rate: this.EXCHANGE_RATES["USD-VES"],
        lastUpdated: new Date().toISOString(),
      },
      {
        from: "EUR",
        to: "VES",
        rate: this.EXCHANGE_RATES["EUR-VES"],
        lastUpdated: new Date().toISOString(),
      },
      {
        from: "GBP",
        to: "VES",
        rate: this.EXCHANGE_RATES["GBP-VES"],
        lastUpdated: new Date().toISOString(),
      },
      {
        from: "CNY",
        to: "VES",
        rate: this.EXCHANGE_RATES["CNY-VES"],
        lastUpdated: new Date().toISOString(),
      },
    ]

    return rates
  }

  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<ConversionResult | null> {
    const fromCurrencyData = this.getCurrencyByCode(fromCurrency)
    const toCurrencyData = this.getCurrencyByCode(toCurrency)

    if (!fromCurrencyData || !toCurrencyData) {
      return null
    }

    const rateKey = `${fromCurrency}-${toCurrency}`
    const rate = this.EXCHANGE_RATES[rateKey]

    if (!rate) {
      return null
    }

    const convertedAmount = amount * rate

    return {
      amount,
      fromCurrency: fromCurrencyData,
      toCurrency: toCurrencyData,
      convertedAmount: Number.parseFloat(convertedAmount.toFixed(2)),
      rate,
      lastUpdated: new Date().toISOString(),
    }
  }
}
