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
import { User } from './user.model';
import { TravelRequest } from './travelRequest.model';

@Entity()
export class Driver {
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

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.driver)
  travelRequest: TravelRequest[];
}
