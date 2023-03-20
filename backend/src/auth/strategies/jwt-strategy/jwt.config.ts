import { JwtModuleOptions } from '@nestjs/jwt';

export const configJwtOptions: JwtModuleOptions = {
  secret: 'hola-mundo',
  signOptions: { expiresIn: '30d' },
};
