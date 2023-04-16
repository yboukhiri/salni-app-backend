import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "src/common/entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Public } from "./public.auth";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("api/auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post("signup")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );
    createUserDto.password = hashedPassword;
    const result = await this.usersService.createUser(createUserDto);
    return result;
  }

  @Public()
  @Post("login")
  async login(@Request() req) {
    const userCredentials = req.body;
    const user = await this.authService.validateUser(userCredentials);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Get()
  getCurrentUser(@Request() req) {
    return this.authService.getCurrentUser(req);
  }
}
