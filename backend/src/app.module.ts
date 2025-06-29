import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { BCVController } from './controllers/bcv.controller';
import { BCVService } from './services/bcv.service';
import { ExchangeRateHistory } from './entities/exchange-rate-history.entity';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ExchangeRateHistory, Currency],
      synchronize: true, // Solo para desarrollo
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([ExchangeRateHistory, Currency]),
  ],
  controllers: [CurrencyController, BCVController],
  providers: [CurrencyService, BCVService],
})
export class AppModule {} 