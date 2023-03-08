import { DatabaseService } from '@Database/database';
import { Injectable } from '@nestjs/common';
import to from 'await-to-js';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUser(email: string) {
    const [error, response] = await to(
      this.databaseService.userRepository.findOne({
        where: {
          email,
        },
      }),
    );
    if (error) {
      throw new Error('Error al realizar la consulta');
    }

    return response;
  }

  async getUsers() {
    const [error, response] = await to(
      this.databaseService.userRepository.find(),
    );
    if (error) {
      throw new Error('Error al realizar la consulta');
    }

    return response;
  }

  async getUsersDriver() {
    const [error, response] = await to(
      this.databaseService.userRepository.find({
        where: {
          type: 'DRIVER',
        },
      }),
    );
    if (error) {
      throw new Error('Error al realizar la consulta');
    }

    return response;
  }

  async getUsersRider() {
    const [error, response] = await to(
      this.databaseService.userRepository.find({
        where: {
          type: 'RIDER',
        },
      }),
    );
    if (error) {
      throw new Error('Error al realizar la consulta');
    }

    return response;
  }
}
