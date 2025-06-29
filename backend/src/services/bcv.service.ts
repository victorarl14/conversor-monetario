import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
const https = require('https');

export interface BCVRate {
  currency: string;
  rate: number;
  date: string;
}

export interface BCVData {
  rates: BCVRate[];
  lastUpdated: string;
  source: string;
}

@Injectable()
export class BCVService {
  private readonly logger = new Logger(BCVService.name);
  private readonly BCV_URL = 'https://www.bcv.org.ve/';
  private readonly BCV_CURRENCIES = {
    'USD': 'dolar',
    'EUR': 'euro', 
    'CNY': 'yuan',
    'TRY': 'lira',
    'RUB': 'rublo'
  };

  private cachedData: BCVData | null = null;
  private lastCacheTime: number = 0;
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hora en milisegundos

  async getOfficialRates(): Promise<BCVData> {
    const now = Date.now();
    
    // Verificar si tenemos datos en caché y no han expirado
    if (this.cachedData && (now - this.lastCacheTime) < this.CACHE_DURATION) {
      this.logger.log('Retornando datos en caché del BCV');
      return this.cachedData;
    }

    try {
      this.logger.log('Obteniendo tasas oficiales del BCV...');
      
      // Ignorar verificación de certificado SSL (solo desarrollo)
      const agent = new https.Agent({ rejectUnauthorized: false });
      const response = await axios.get(this.BCV_URL, {
        timeout: 30000,
        httpsAgent: agent,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const rates: BCVRate[] = [];
      
      // Extraer la fecha
      const dateElement = $('span.date-display-single');
      const dateContent = dateElement.attr('content');
      const rateDate = dateContent ? new Date(dateContent).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

      // Extraer las tasas para cada moneda
      for (const [currencyCode, currencyId] of Object.entries(this.BCV_CURRENCIES)) {
        try {
          const rateElement = $(`#${currencyId} .centrado strong`);
          const rateText = rateElement.text().trim();
          
          if (rateText) {
            const rate = parseFloat(rateText.replace(',', '.'));
            if (!isNaN(rate) && rate > 0) {
              rates.push({
                currency: currencyCode,
                rate: rate,
                date: rateDate
              });
            }
          }
        } catch (error) {
          this.logger.warn(`Error al extraer tasa para ${currencyCode}: ${error.message}`);
        }
      }

      // Agregar VES con tasa 1.0
      rates.push({
        currency: 'VES',
        rate: 1.0,
        date: rateDate
      });

      this.cachedData = {
        rates,
        lastUpdated: new Date().toISOString(),
        source: 'Banco Central de Venezuela (BCV)'
      };
      
      this.lastCacheTime = now;
      
      this.logger.log(`Tasas oficiales obtenidas exitosamente: ${rates.length} monedas`);
      return this.cachedData;

    } catch (error) {
      this.logger.error(`Error al obtener tasas del BCV: ${error.message}`);
      
      // Si hay error y tenemos datos en caché, devolver los datos en caché aunque hayan expirado
      if (this.cachedData) {
        this.logger.log('Devolviendo datos en caché debido a error en la obtención');
        return this.cachedData;
      }
      
      throw new Error('No se pudieron obtener las tasas oficiales del BCV');
    }
  }

  async getRateForCurrency(currencyCode: string): Promise<number | null> {
    try {
      const bcvData = await this.getOfficialRates();
      const rate = bcvData.rates.find(r => r.currency === currencyCode);
      return rate ? rate.rate : null;
    } catch (error) {
      this.logger.error(`Error al obtener tasa para ${currencyCode}: ${error.message}`);
      return null;
    }
  }

  async getUSDToVESRate(): Promise<number | null> {
    return this.getRateForCurrency('USD');
  }

  async getEURToVESRate(): Promise<number | null> {
    return this.getRateForCurrency('EUR');
  }

  clearCache(): void {
    this.cachedData = null;
    this.lastCacheTime = 0;
    this.logger.log('Caché del BCV limpiado');
  }
} 