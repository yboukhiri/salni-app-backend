import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { FriendshipService } from "./friendship.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, FriendshipService],
})
export class UsersModule {}
