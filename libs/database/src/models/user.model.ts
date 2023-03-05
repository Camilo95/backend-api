import { createHash } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MethodPayment } from './methodPayment.model';

type TTypeUser = 'CONDUCTOR' | 'PASAJERO';

/* It's a class that represents a user */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  private password: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  type: TTypeUser;

  @OneToMany(() => MethodPayment, (methodPayment) => methodPayment.user)
  methodPayment: MethodPayment[];

  set hashPassword(data: string) {
    const hash = createHash('sha256').update(data).digest('hex');
    this.password = hash;
  }

  get hashPassword() {
    return this.password;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
