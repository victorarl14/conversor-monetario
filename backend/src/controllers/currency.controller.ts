import { Controller, Get, Post, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CurrencyService } from "../services/currency.service"
import type { ConversionRequest } from "../types/currency.types"
import { ExchangeRateHistory } from '../entities/exchange-rate-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly currencyService: CurrencyService,
    @InjectRepository(ExchangeRateHistory)
    private readonly historyRepo: Repository<ExchangeRateHistory>,
  ) {}

  @Get('currencies')
  async getCurrencies() {
    try {
      const currencies = this.currencyService.getCurrencies()
      return {
        success: true,
        data: currencies,
      }
    } catch (error) {
      throw new HttpException('Error al obtener las monedas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('exchange-rates')
  async getExchangeRates() {
    try {
      const rates = await this.currencyService.getExchangeRates()
      return {
        success: true,
        rates: rates,
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      throw new HttpException('Error al obtener las tasas de cambio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('official-bcv-rates')
  async getOfficialBCVRates() {
    try {
      const bcvData = await this.currencyService.getOfficialBCVRates()
      return {
        success: true,
        data: bcvData,
        message: 'Tasas oficiales del Banco Central de Venezuela',
      }
    } catch (error) {
      throw new HttpException('Error al obtener las tasas oficiales del BCV', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('convert')
  async convertCurrency(@Body() request: ConversionRequest) {
    try {
      const { amount, fromCurrency, toCurrency } = request

      if (!amount || !fromCurrency || !toCurrency) {
        throw new HttpException('Parámetros faltantes', HttpStatus.BAD_REQUEST);
      }

      if (amount <= 0) {
        throw new HttpException('La cantidad debe ser mayor a 0', HttpStatus.BAD_REQUEST);
      }

      const result = await this.currencyService.convertCurrency(amount, fromCurrency, toCurrency)

      if (!result) {
        throw new HttpException('Conversión no disponible', HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        result: result,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error en la conversión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('history')
  async getHistory(@Query('currency') currencyCode: string) {
    if (!currencyCode) {
      throw new HttpException('Debe especificar el parámetro currency', HttpStatus.BAD_REQUEST);
    }
    const history = await this.historyRepo.find({
      where: { currency: { code: currencyCode } },
      order: { rateDate: 'DESC', createdAt: 'DESC' },
    });
    return { success: true, data: history };
  }
}
