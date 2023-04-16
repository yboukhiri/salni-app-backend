import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deal } from "./entities/deal.entity";
import { FriendRequest } from "./entities/friend-request.entity";
import { Transaction } from "./entities/transaction.entity";
import { User } from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "test",
      entities: [User, FriendRequest, Deal, Transaction],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CommonModule {}
