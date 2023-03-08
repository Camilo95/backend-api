import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Types
import { TRANSACTIONS_STATUS } from '@wompi/wompi/types';

@Entity()
export class TravelPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount_payed: number;

  @Column({ type: 'varchar', length: 10 })
  status_transaction: TRANSACTIONS_STATUS;

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date | string;
}
