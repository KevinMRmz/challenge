import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services/auth/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  const userList = [
    {
      id: 1,
      email: 'kevin10@gmail.com',
      password: '123456789',
    },
    {
      id: 2,
      email: 'juan10@gmail.com',
      password: '123456789',
    },
    {
      id: 3,
      email: 'pedro10@gmail.com',
      password: '123456789',
    },
  ];

  let controller: AuthController;
  let mockAuthService = {
    signIn: (email: string, password: string) => {
      const user = userList.find((user) => user.email === email);
      if (user && user.password === password) return 'User log in successfully';
      return {
        statusCode: 401,
        Message: 'Invalid credentials',
      };
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('user sign in functionality', () => {
    test('user invalid email', async () => {
      const result = await controller.signIn({
        email: 'kevin20@gmail.com',
        password: '123456789',
      });
      expect(result).toMatchObject({
        statusCode: 401,
        Message: 'Invalid credentials',
      });
    });

    test('user invalid password', async () => {
      const result = await controller.signIn({
        email: 'kevin10@gmail.com',
        password: '12345678',
      });
      expect(result).toMatchObject({
        statusCode: 401,
        Message: 'Invalid credentials',
      });
    });

    test('user signed in', async () => {
      const result = await controller.signIn({
        email: 'kevin10@gmail.com',
        password: '123456789',
      });
      expect(result).toBe('User log in successfully');
    });
  });
});
