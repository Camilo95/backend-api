import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Types
import { TStatus } from '../types';

// Models
import { MethodPayment } from './methodPayment.model';
import { TravelRequest } from './travelRequest.model';
import { User } from './user.model';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  status: TStatus;

  @Column({ type: 'float' })
  score: Float32Array;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.passenger)
  travelRequest: TravelRequest[];

  @OneToMany(() => MethodPayment, (methodPayment) => methodPayment.passenger)
  methodPayment: MethodPayment[];
}
