import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExchangeRateHistory } from './exchange-rate-history.entity';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 5 })
  symbol: string;

  @Column({ length: 5 })
  flag: string;

  @OneToMany(() => ExchangeRateHistory, (rate) => rate.currency)
  rates: ExchangeRateHistory[];
} 