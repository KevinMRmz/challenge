import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { SignInDto } from '../../dtos';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully signed in.',
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-out')
  signOut() {
    return this.authService.signOut();
  }
}
