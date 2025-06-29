import { Injectable, Logger } from '@nestjs/common';
import type { Currency, ExchangeRate, ConversionResult } from "../types/currency.types"
import { BCVService } from './bcv.service';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private readonly bcvService: BCVService) {}

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
      code: "CNY",
      name: "Yuan Chino",
      symbol: "¥",
      flag: "🇨🇳",
    },
    {
      code: "TRY",
      name: "Lira Turca",
      symbol: "₺",
      flag: "🇹🇷",
    },
    {
      code: "RUB",
      name: "Rublo Ruso",
      symbol: "₽",
      flag: "🇷🇺",
    },
    {
      code: "VES",
      name: "Bolívar Venezolano",
      symbol: "Bs.",
      flag: "🇻🇪",
    },
  ]

  // Tasas de respaldo en caso de que falle el BCV
  private readonly FALLBACK_RATES: Record<string, number> = {
    "USD-VES": 36.5,
    "EUR-VES": 39.85,
    "CNY-VES": 5.15,
    "VES-USD": 1 / 36.5,
    "VES-EUR": 1 / 39.85,
    "VES-CNY": 1 / 5.15,
  }

  getCurrencies(): Currency[] {
    return this.CURRENCIES
  }

  getCurrencyByCode(code: string): Currency | undefined {
    return this.CURRENCIES.find((currency) => currency.code === code)
  }

  async getExchangeRates(): Promise<ExchangeRate[]> {
    try {
      // Intentar obtener tasas oficiales del BCV
      const bcvData = await this.bcvService.getOfficialRates();
      
      const rates: ExchangeRate[] = bcvData.rates
        .filter(rate => rate.currency !== 'VES') // Excluir VES ya que es la base
        .map(rate => ({
          from: rate.currency,
          to: "VES",
          rate: rate.rate,
          lastUpdated: bcvData.lastUpdated,
          rateDate: rate.date,
        }));

      this.logger.log(`Tasas oficiales obtenidas del BCV: ${rates.length} monedas`);
      return rates;

    } catch (error) {
      this.logger.warn(`Error al obtener tasas del BCV, usando tasas de respaldo: ${error.message}`);
      
      // Usar tasas de respaldo si falla el BCV
      const rates: ExchangeRate[] = [
        {
          from: "USD",
          to: "VES",
          rate: this.FALLBACK_RATES["USD-VES"],
          lastUpdated: new Date().toISOString(),
        },
        {
          from: "EUR",
          to: "VES",
          rate: this.FALLBACK_RATES["EUR-VES"],
          lastUpdated: new Date().toISOString(),
        },
        {
          from: "CNY",
          to: "VES",
          rate: this.FALLBACK_RATES["CNY-VES"],
          lastUpdated: new Date().toISOString(),
        },
      ];

      return rates;
    }
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

    try {
      let rate: number;

      // Si ambas monedas son VES, la tasa es 1
      if (fromCurrency === 'VES' && toCurrency === 'VES') {
        rate = 1;
      }
      // Si una es VES, obtener la tasa del BCV
      else if (fromCurrency === 'VES') {
        const bcvRate = await this.bcvService.getRateForCurrency(toCurrency);
        rate = bcvRate ? 1 / bcvRate : this.FALLBACK_RATES[`VES-${toCurrency}`];
      }
      else if (toCurrency === 'VES') {
        const bcvRate = await this.bcvService.getRateForCurrency(fromCurrency);
        rate = bcvRate || this.FALLBACK_RATES[`${fromCurrency}-VES`];
      }
      // Si ninguna es VES, calcular la tasa cruzada
      else {
        const fromRate = await this.bcvService.getRateForCurrency(fromCurrency);
        const toRate = await this.bcvService.getRateForCurrency(toCurrency);
        
        if (fromRate && toRate) {
          rate = toRate / fromRate;
        } else {
          // Usar tasas de respaldo para el cálculo cruzado
          const fromFallback = this.FALLBACK_RATES[`${fromCurrency}-VES`];
          const toFallback = this.FALLBACK_RATES[`${toCurrency}-VES`];
          rate = toFallback / fromFallback;
        }
      }

      if (!rate || isNaN(rate)) {
        this.logger.error(`No se pudo calcular la tasa para ${fromCurrency} a ${toCurrency}`);
        return null;
      }

      const convertedAmount = amount * rate;

      return {
        amount,
        fromCurrency: fromCurrencyData,
        toCurrency: toCurrencyData,
        convertedAmount,
        rate,
        lastUpdated: new Date().toISOString(),
      };

    } catch (error) {
      this.logger.error(`Error en conversión de ${fromCurrency} a ${toCurrency}: ${error.message}`);
      return null;
    }
  }

  async getOfficialBCVRates() {
    return this.bcvService.getOfficialRates();
  }
}
