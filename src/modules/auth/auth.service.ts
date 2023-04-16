import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userCredentials: { email: string; password: string }) {
    const user = await this.usersService.getUserByEmail(userCredentials.email);
    if (!user) {
      return null;
    }
    const passwordValid = await bcrypt.compare(
      userCredentials.password,
      user.password
    );
    if (!user) {
      throw new Error("User does not exist");
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getCurrentUser(req) {
    // get current user from bearer token
    const token = req.headers.authorization.split(" ")[1];
    const payload = this.jwtService.verify(token);
    const user = await this.usersService.getUserById(payload.id);
    return user;
  }
}
