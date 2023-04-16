import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FriendshipService } from "../users/friendship.service";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, FriendshipService],
  exports: [AuthService, UsersService, JwtStrategy, FriendshipService],
})
export class AuthModule {}
