import { DataSource } from 'typeorm';
import { Currency } from '../entities/currency.entity';
import { ExchangeRateHistory } from '../entities/exchange-rate-history.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Currency, ExchangeRateHistory],
  ssl: { rejectUnauthorized: false },
});

const currencies: Partial<Currency>[] = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: 'USD', flag: 'US' },
  { code: 'EUR', name: 'Euro', symbol: 'EUR', flag: 'EU' },
  { code: 'CNY', name: 'Yuan Chino', symbol: 'CNY', flag: 'CN' },
  { code: 'TRY', name: 'Lira Turca', symbol: 'TRY', flag: 'TR' },
  { code: 'RUB', name: 'Rublo Ruso', symbol: 'RUB', flag: 'RU' },
  { code: 'VES', name: 'Bolívar Venezolano', symbol: 'VES', flag: 'VE' },
];

AppDataSource.initialize()
  .then(async () => {
    for (const c of currencies) {
      const exists = await AppDataSource.getRepository(Currency).findOneBy({ code: c.code });
      if (!exists) {
        await AppDataSource.getRepository(Currency).save(c);
        console.log(`Moneda insertada: ${c.code}`);
      } else {
        console.log(`Moneda ya existe: ${c.code}`);
      }
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error al insertar monedas:', err);
    process.exit(1);
  }); 