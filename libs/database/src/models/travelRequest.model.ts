import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Types
import { TStatusService } from '../types';

// Models
import { TravelPayment } from './travelPayment.model';
import { User } from './user.model';

@Entity()
export class TravelRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reference: number;

  @Column()
  starting_latitude: string;

  @Column()
  starting_longitude: string;

  @Column()
  ending_latitude: string;

  @Column()
  ending_longitude: string;

  @Column()
  amount: number;

  @Column({ type: 'timestamp' })
  starting_travel?: Date | string;

  @Column({ type: 'timestamp' })
  ending_travel?: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  status: TStatusService; // EN CURSO o PAGADO

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date | string;

  @ManyToOne(() => User, (user) => user.userRider)
  @JoinColumn()
  userRider: User;

  @ManyToOne(() => User, (user) => user.userDriver)
  @JoinColumn()
  userDriver: User;

  @OneToOne(() => TravelPayment)
  @JoinColumn()
  travelPayment: TravelPayment;
}
