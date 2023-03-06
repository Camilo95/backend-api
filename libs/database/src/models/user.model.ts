import { createHash } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
