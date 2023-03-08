import { DatabaseService } from '@Database/database';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import util from 'util';

const sleep = util.promisify(setTimeout);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

// Dtos
import { TravelDto } from './dtos/travel.dto';

// Modules
import { WompiService } from '@wompi/wompi';
import {
  CURRENCY,
  PAYMENTS_METHOD,
  TRANSACTIONS_STATUS,
  TTransaction,
} from '@wompi/wompi/types';

@Injectable()
export class TravelService {
  baseTarifa = 3500;
  baseMinutes = 200;
  baseKm = 1000;

  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
    private readonly wompiService: WompiService,
  ) {}

  async createServiceTravel(travel: TravelDto) {
    const drivers = await this.userService.getUsersDriver();
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const riders = await this.userService.getUsersRider();
    const rider = riders[Math.floor(Math.random() * riders.length)];

    const newTravel = this.databaseService.travelRequest;
    newTravel.starting_latitude = travel.latitude;
    newTravel.starting_longitude = travel.longitude;
    // newTravel.ending_latitude = travel.latitude;
    // newTravel.ending_longitude = travel.longitude;
    newTravel.reference = this.generateReference();
    newTravel.status = 'EN CURSO';
    newTravel.created_at = new Date();
    newTravel.starting_travel = new Date();
    // newTravel.ending_travel = new Date();
    newTravel.userDriver = driver;
    newTravel.userRider = rider;

    const createTravel =
      this.databaseService.travelRequestRepository.create(newTravel);
    const travelSaved = await this.databaseService.travelRequestRepository.save(
      createTravel,
    );

    return { id: travelSaved.id };
  }

  generateReference() {
    return Math.floor(Math.random() * 100000);
  }

  async getTravelsOnProgress(id: string) {
    return await this.databaseService.travelRequestRepository.findOne({
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

    await this.databaseService.travelRequestRepository.save(travel);

    const token = await this.wompiService.getAcceptanceToken();
    const newTransaction: TTransaction = {
      currency: CURRENCY.COP,
      customer_email: travel.userRider.email,
      payment_method: {
        type: PAYMENTS_METHOD.CARD,
        token: travel.userRider.methodPayment.token,
        installments: 1,
      },
      reference: travel.reference.toString(),
      amount_in_cents: this.wompiService.convertAmountToCents(3000),
      acceptance_token: token.acceptance_token,
    };

    const transaction = await this.wompiService.sendTransaction(newTransaction);

    await sleep(2000);

    const idTransaction = transaction.data.id;
    const responsetransaction = await this.wompiService.getTransaction(
      idTransaction,
    );

    if (responsetransaction.data.status === TRANSACTIONS_STATUS.APPROVED) {
      const travelPayment = this.databaseService.travelPayment;
      travelPayment.status_transaction = TRANSACTIONS_STATUS.APPROVED;
      travelPayment.amount_payed = transaction.data.amount_in_cents;

      const newTravelPayment =
        this.databaseService.travelPaymentRepository.create(travelPayment);
      this.databaseService.travelPaymentRepository.save(newTravelPayment);
    }
  }

  calculateCost(minutes: number, kilometros: number) {
    const total =
      minutes * this.baseMinutes + kilometros * this.baseKm + this.baseTarifa;
    return total;
  }
}
