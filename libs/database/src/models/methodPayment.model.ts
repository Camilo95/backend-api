import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Models
import { User } from './user.model';

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
  type: string;

  @Column({ type: 'timestamp' })
  created_at: Date | string;

  @ManyToOne(() => User, (user) => user.methodPayment)
  user: User;
}
