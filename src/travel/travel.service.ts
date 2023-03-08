import { DatabaseService } from '@Database/database';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dtos
import { TravelDto } from './dtos/travel.dto';

// Modules
import { PaymentService } from 'libs/payment/src';
import {
  CURRENCY,
  PAYMENTS_METHOD,
  TTransaction,
} from 'libs/payment/src/types';

@Injectable()
export class TravelService {
  baseTarifa = 3500;
  baseMinutes = 200;
  baseKm = 1000;

  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
    private readonly paymentService: PaymentService,
  ) {}

  async createServiceTravel(travel: TravelDto) {
    const drivers = await this.userService.getUsersDriver();
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const riders = await this.userService.getUsersRider();
    const rider = riders[Math.floor(Math.random() * riders.length)];

    const newTravel = this.databaseService.travelRequest;
    newTravel.starting_latitude = travel.latitude;
    newTravel.starting_longitude = travel.longitude;
    newTravel.reference = this.generateReference();
    newTravel.status = 'EN CURSO';
    newTravel.created_at = new Date();
    newTravel.starting_travel = new Date();
    newTravel.userDriver = driver;
    newTravel.userRider = rider;

    const createTravel =
      this.databaseService.travelRequestRepository.create(newTravel);
    const travelSaved = await this.databaseService.travelRequestRepository.save(
      createTravel,
    );

    return { id: travelSaved.id };
  }

  async finishServiceTravel(finishTravel: TravelDto) {
    const travel = await this.getTravelsOnProgress(finishTravel.id);

    const time = this.calculateTime();

    travel.ending_travel = time.date;
    travel.ending_latitude = finishTravel.latitude;
    travel.ending_longitude = finishTravel.longitude;

    const km = this.calculateLongitud(
      travel.starting_latitude,
      travel.starting_longitude,
      travel.ending_latitude,
      travel.ending_longitude,
    );

    travel.amount = this.calculateCost(time.minutes, km);

    // Create transaction
    const token = await this.paymentService.getAcceptanceToken();

    const newTransaction: TTransaction = {
      currency: CURRENCY.COP,
      customer_email: travel.userRider.email,
      payment_method: {
        type: PAYMENTS_METHOD.CARD,
        token: travel.userRider.methodPayment[0].token,
        installments: 1,
      },
      reference: travel.reference.toString(),
      amount_in_cents: this.paymentService.convertAmountToCents(travel.amount),
      acceptance_token: token.acceptance_token,
    };
    const transaction = await this.paymentService.sendTransaction(
      newTransaction,
    );
    if (transaction.error) {
      throw new Error(
        `Ocurro un error al crear la transaccion: ${transaction.error.messages.reference[0]}`,
      );
    }

    await sleep(5000);

    // Get transaction
    const idTransaction = transaction.data.id;
    const responsetransaction = await this.paymentService.getTransaction(
      idTransaction,
    );

    // Create payment
    const travelPayment = this.databaseService.travelPayment;
    travelPayment.status_transaction = responsetransaction.data.status;
    travelPayment.amount_payed = transaction.data.amount_in_cents;

    const newTravelPayment =
      this.databaseService.travelPaymentRepository.create(travelPayment);
    this.databaseService.travelPaymentRepository.save(newTravelPayment);

    // Update travel
    travel.travelPayment = travelPayment;
    await this.databaseService.travelRequestRepository.save(travel);

    return { message: 'the service is completed' };
  }

  generateReference() {
    return Math.floor(Math.random() * 100000);
  }

  async getTravelsOnProgress(id: string) {
    return await this.databaseService.travelRequestRepository.findOne({
      relations: {
        userRider: { methodPayment: true },
      },
      where: {
        id: id,
        status: 'EN CURSO',
      },
    });
  }

  private calculateTime() {
    const minutes = Math.floor(Math.random() * 10);

    return {
      date: moment(new Date(), 'hh:mm:ss A').add(minutes, 'minutes').format(),
      minutes,
    };
  }

  /* private calcualteLongLat() {
    return {
      longitude: Math.floor(Math.random() * 100000).toString(),
      latitude: Math.floor(Math.random() * 100000).toString(),
    };
  }*/

  private calculateLongitud(puntoA1, puntoA2, puntoB1, puntoB2) {
    const km = 10000;
    const longitude = Math.sqrt(
      Math.pow(puntoA2 - puntoA1, 2) + Math.pow(puntoB2 - puntoB1, 2),
    );
    const newLongitude = longitude / km;

    return parseInt(newLongitude.toString(), 10);
  }

  calculateCost(minutes: number, kilometros: number) {
    const total =
      minutes * this.baseMinutes + kilometros * this.baseKm + this.baseTarifa;
    return total;
  }
}
