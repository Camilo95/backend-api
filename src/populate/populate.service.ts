import { DatabaseService } from '@Database/database';
import { User } from '@Database/database/models';
import { Injectable } from '@nestjs/common';
import { PAYMENTS_METHOD } from '@wompi/wompi/types';

@Injectable()
export class PopulateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async populateUsers(users: User[]) {
    const methodPayment = this.databaseService.methodPayment;
    methodPayment.token = 'tok_test_37635_0A82b0a3536a4B9662c6F2392b5baBfA';
    methodPayment.expires_token = '2023-09-04T06:04:16.000Z';
    methodPayment.type = PAYMENTS_METHOD.CARD;
    methodPayment.last_four = '4242';

    for (const user of users) {
      const newUser = this.databaseService.userRepository.create(user);

      const responseUser = await this.databaseService.userRepository.save(
        newUser,
      );

      methodPayment.user = responseUser;
      methodPayment.created_at = new Date();

      const newMethodPayment =
        this.databaseService.methodPaymentRepository.create(methodPayment);
      await this.databaseService.methodPaymentRepository.save(newMethodPayment);
    }
  }
}
