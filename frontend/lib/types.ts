export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

export interface ExchangeRate {
  from: string
  to: string
  rate: number
  lastUpdated: string
}

export interface ConversionResult {
  amount: number
  fromCurrency: Currency
  toCurrency: Currency
  convertedAmount: number
  rate: number
  lastUpdated: string
} 