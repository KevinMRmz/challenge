import { UserRole } from '../../enums/user-roles';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../services/user/user.service';
import { UserController } from './user.controller';
import { ChangePasswordDto, CreateUserDto } from 'src/users/dtos';

describe('UserController', () => {
  const userList = [
    {
      id: 1,
      name: 'Kevin',
      email: 'kevin10@gmail.com',
      password: '123456789',
      role: UserRole.USER,
    },
    {
      id: 2,
      name: 'Juan',
      email: 'juan10@gmail.com',
      role: UserRole.USER,
      password: '123456789',
    },
    {
      id: 3,
      name: 'Pedro',
      email: 'pedro10@gmail.com',
      role: UserRole.USER,
      password: '123456789',
    },
  ];

  let controller: UserController;
  let mockUserService = {
    getUsers: () => {
      return userList;
    },

    getUserById: (id: number) => {
      if (typeof id != 'number') {
        return {
          statusCode: 400,
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
        };
      }

      const user = userList.find((user) => user.id === id);

      if (!user) {
        return {
          statusCode: 404,
          message: 'User not found',
        };
      }

      return user;
    },

    createUser: (createUserDto: CreateUserDto) => {
      return createUserDto;
    },

    deleteUser: async (id: number) => {
      return userList.filter((user) => user.id != id);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await controller.getUsers();
    expect(users).toEqual(userList);
  });

  describe('Testing get user endpoint', () => {
    it('should return an user', async () => {
      const user = await controller.getUserById(1);
      expect(user).toBe(userList[0]);
    });

    it('user was not found', async () => {
      const result = await controller.getUserById(4);
      expect(result).toMatchObject({
        statusCode: 404,
        message: 'User not found',
      });
    });

    it('Id provided is not a number', async () => {
      const response = await controller.getUserById('o' as any);
      expect(response).toMatchObject({
        statusCode: 400,
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
      });
    });
  });

  it('Should create an user', async () => {
    const createUserData = {
      ...userList[0],
      confirmPassword: '123456789',
    };
    const user = await controller.createUser(createUserData);

    expect(user).toMatchObject(createUserData);
  });

  describe('Testing delete function', () => {
    it('Should delete an user', async () => {
      const newUsersList = await controller.deleteUser(3);
      expect(newUsersList).toMatchObject({
        message: 'User has been deleted successfully',
        success: true,
      });
    });
  });
});
