import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities';
import { AccountsModule } from 'src/accounts/accounts.module';
import { MovementsModule } from 'src/movements/movements.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountsModule, MovementsModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
