import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Currency } from './currency.entity';

@Entity('exchange_rate_history')
export class ExchangeRateHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Currency, (currency) => currency.rates, { eager: true })
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @Column('decimal', { precision: 18, scale: 8 })
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'date' })
  rateDate: string; // Fecha oficial de la tasa según el BCV

  @Column({ type: 'timestamp', nullable: true })
  rateDateTime: Date | null; // Fecha y hora oficial de la tasa según el BCV
} 