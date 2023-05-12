import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UnauthorizedException,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { User } from "src/common/entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { Public } from "./public.auth";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login-dto";
import { UserDto } from "src/common/mappers/user-to-dto";

@ApiTags("Auth")
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
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Get()
  @ApiResponse({ type: UserDto })
  async getCurrentUser(@Request() req): Promise<UserDto> {
    return await this.authService.getCurrentUserDto(req);
  }

  @Delete()
  @HttpCode(204)
  async deleteUser(@Request() req) {
    const user = await this.authService.getCurrentUser(req);
    await this.usersService.deleteUser(user.id);
  }
}
