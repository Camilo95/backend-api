import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Models
import { Passenger } from './passenger.model';

@Entity()
export class MethodPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  last_four: string;

  @Column({ type: 'timestamp' })
  expires_token: Date | string;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp' })
  created_at: Date | string;

  @ManyToOne(() => Passenger, (passenger) => passenger.methodPayment)
  passenger: Passenger;
}
