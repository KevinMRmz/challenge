import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from 'src/accounts/dtos';

describe('AccountController', () => {
  let controller: AccountController;
  let mockAccountService = {
    getAccounts: () => {
      return accountArray;
    },
    getAccountById: (id: number) => {
      if (typeof id != 'number') {
        return {
          statusCode: 400,
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
        };
      }

      const account = accountArray.find((account) => account.id === id);

      if (!account) {
        return {
          statusCode: 404,
          message: 'Account not found',
        };
      }

      return account;
    },
    createAccount: (createAccountDto: CreateAccountDto) => {
      return createAccountDto;
    },
    deleteAccount: (id: number) => {
      return 'user deleted';
    },
  };

  const accountArray = [
    {
      id: 1,
      accountName: '33-DR',
      clientName: 'John',
      operationManagerName: 'Sam',
    },
    {
      id: 2,
      accountName: 'DE-0',
      clientName: 'Hector',
      operationManagerName: 'Dan',
    },
    {
      id: 3,
      accountName: 'R-DR',
      clientName: 'John',
      operationManagerName: 'Sam',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    })
      .overrideProvider(AccountService)
      .useValue(mockAccountService)
      .compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return an array of accounts', async () => {
    const accounts = await controller.getAccounts();
    expect(accounts).toEqual(accountArray);
  });

  describe('Testing Get account endpoint', () => {
    it('Should return a single account', async () => {
      const account = await controller.getSingleAccount(1);
      expect(account).toEqual(accountArray[0]);
    });

    it('Should not find an account', async () => {
      const response = await controller.getSingleAccount(4);
      expect(response).toMatchObject({
        statusCode: 404,
        message: 'Account not found',
      });
    });

    it('Should return an validation error', async () => {
      const response = await controller.getSingleAccount('a' as any);
      expect(response).toMatchObject({
        statusCode: 400,
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
      });
    });
  });

  it('should create a new account', async () => {
    const account = await controller.createAccount(accountArray[0]);
    expect(account).toMatchObject(accountArray[0]);
  });

  it('should return an delete response', async () => {
    const response = await controller.deleteAccount(0);
    expect(response).toMatchObject({
      message: 'User has been deleted successfully',
      success: true,
    });
  });
});
