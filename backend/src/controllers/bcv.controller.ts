import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { BCVService, BCVData } from '../services/bcv.service';

@Controller('bcv')
export class BCVController {
  constructor(private readonly bcvService: BCVService) {}

  @Get('official-rates')
  async getOfficialRates(): Promise<BCVData> {
    return this.bcvService.getOfficialRates();
  }

  @Get('usd-rate')
  async getUSDRate(): Promise<{ rate: number | null; lastUpdated: string }> {
    const rate = await this.bcvService.getUSDToVESRate();
    return {
      rate,
      lastUpdated: new Date().toISOString()
    };
  }

  @Get('eur-rate')
  async getEURRate(): Promise<{ rate: number | null; lastUpdated: string }> {
    const rate = await this.bcvService.getEURToVESRate();
    return {
      rate,
      lastUpdated: new Date().toISOString()
    };
  }

  @Post('clear-cache')
  @HttpCode(HttpStatus.OK)
  async clearCache(): Promise<{ message: string }> {
    this.bcvService.clearCache();
    return { message: 'Caché del BCV limpiado exitosamente' };
  }
} 