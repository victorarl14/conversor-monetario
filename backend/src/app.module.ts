import { Module } from '@nestjs/common';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { BCVController } from './controllers/bcv.controller';
import { BCVService } from './services/bcv.service';

@Module({
  imports: [],
  controllers: [CurrencyController, BCVController],
  providers: [CurrencyService, BCVService],
})
export class AppModule {} 