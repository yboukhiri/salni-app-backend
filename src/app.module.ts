import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
// console.log(
//   join(__dirname, '..', 'src', 'common', 'entities', '*.entity{.ts,.js}'),
// );
