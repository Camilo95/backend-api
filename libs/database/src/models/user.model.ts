import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Models
import { TravelRequest } from './travelRequest.model';
import { MethodPayment } from './methodPayment.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.userRider)
  userRider: TravelRequest[];

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.userDriver)
  userDriver: TravelRequest[];

  @OneToMany(() => MethodPayment, (methodPayment) => methodPayment.user)
  travelPayment: MethodPayment;

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
