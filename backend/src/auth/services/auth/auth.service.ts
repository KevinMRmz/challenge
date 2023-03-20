import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../../users/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const comparePasswords = await bcrypt.compare(password, user.password);

    if (!comparePasswords) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      accessToken: this.signJwtToken(user),
      user,
    };
  }

  signOut() {}

  signJwtToken(user: IUser) {
    return this.jwtService.sign({
      name: user.name,
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
