import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      email,
      hashedPassword,
      firstName,
      lastName,
    );
    return result;
  }

  @Public()
  @Post('login')
  async login(@Request() req) {
    const userCredentials = req.body;
    const user = await this.authService.validateUser(userCredentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Get()
  getCurrentUser(@Request() req) {
    return this.authService.getCurrentUser(req);
  }
}
