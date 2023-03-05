import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Models
import { User, MethodPayment } from './models';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
    public readonly user: User,

    @InjectRepository(MethodPayment)
    public methodPaymentRepository: Repository<MethodPayment>,
    public readonly methodPayment: MethodPayment,
  ) {}
}
