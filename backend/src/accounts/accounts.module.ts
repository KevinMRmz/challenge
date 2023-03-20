import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/typeorm/entities';
import { UsersModule } from 'src/users/users.module';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), forwardRef(() => UsersModule)],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountsModule {}
