import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtAuthGuard } from "./modules/auth/jwt-auth.guard";
import { ConfigModule } from "@nestjs/config";
import { DealsModule } from "./modules/deals/deals.module";

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    DealsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
