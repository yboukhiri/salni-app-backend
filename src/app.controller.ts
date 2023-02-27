import { Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, //@InjectRepository(User) private UsersRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /*
  Adding random user to the database
  */
}
