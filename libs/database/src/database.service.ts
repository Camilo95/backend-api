import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Models
import {
  User,
  MethodPayment,
  Driver,
  Rider,
  TravelPayment,
  TravelRequest,
} from './models';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
    public readonly user: User,

    @InjectRepository(MethodPayment)
    public methodPaymentRepository: Repository<MethodPayment>,
    public readonly methodPayment: MethodPayment,

    @InjectRepository(Driver)
    public driverRepository: Repository<Driver>,
    public readonly driver: Driver,

    @InjectRepository(Rider)
    public riderRepository: Repository<Rider>,
    public readonly rider: Rider,

    @InjectRepository(TravelPayment)
    public travelPaymentRepository: Repository<TravelPayment>,
    public readonly travelPayment: TravelPayment,

    @InjectRepository(TravelRequest)
    public travelRequestRepository: Repository<TravelRequest>,
    public readonly travelRequest: TravelRequest,
  ) {}
}
