import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request, @Res() res: Response) {
    console.log('invocacion');
    await this.appService.getHello();
    res.status(HttpStatus.ACCEPTED).send();
  }

  /* @Get()
  async handlerCreateTravel(@Req() req: Request, @Res() res: Response) {
    console.log('invocacion');
    await this.appService.getHello();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get()
  async handlerPaymentTravel(@Req() req: Request, @Res() res: Response) {
    console.log('invocacion');
    await this.appService.getHello();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get()
  async handlerTerminationTravel(@Req() req: Request, @Res() res: Response) {
    console.log('invocacion');
    await this.appService.getHello();
    res.status(HttpStatus.ACCEPTED).send();
  }*/
}
