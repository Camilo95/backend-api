import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';

/* It's a class that represents a method payment */
@Entity()
export class MethodPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  last_four: string;

  @Column()
  expires_token: Date | string;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  created_at: Date | string;

  @ManyToOne(() => User, (user) => user.methodPayment)
  user: User;
}
