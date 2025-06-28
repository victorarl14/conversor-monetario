import type { Currency } from "./types"

export const CURRENCIES: Currency[] = [
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

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return CURRENCIES.find((currency) => currency.code === code)
} 