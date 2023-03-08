import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Types
import { TStatusService } from '../types';

@Entity()
export class TravelPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
