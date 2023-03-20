import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { configJwtOptions } from './strategies/jwt-strategy/jwt.config';
import { JwtStrategy } from './strategies/jwt-strategy/jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule.register(configJwtOptions)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
