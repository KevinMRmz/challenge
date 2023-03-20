import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto, UpdateAccountDto } from 'src/accounts/dtos';
import { Account } from '../../../typeorm/entities';
import { UserService } from '../../../users/services/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRespository: Repository<Account>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAccounts(): Promise<Account[]> {
    return await this.accountRespository.find();
  }

  async getAccountById(id: number): Promise<Account> {
    const account = await this.accountRespository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException('Account was not found');
    }

    return account;
  }

  async getAccountByName(accountName: string): Promise<Account | undefined> {
    return await this.accountRespository.findOneBy({ accountName });
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    await this._accountNameAlreadyExists(createAccountDto.accountName);
    const account = this.accountRespository.create(createAccountDto);
    return await this.accountRespository.save(account);
  }

  async updateAccount(
    idAccount: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.accountName)
      await this._accountNameAlreadyExists(updateAccountDto.accountName);

    const account = await this.getAccountById(idAccount);
    return await this.accountRespository.save({
      ...account,
      ...updateAccountDto,
    });
  }

  async deleteAccount(idAccount: number): Promise<void> {
    // All users will be updated with a null account
    await this.userService.removeAllUsersFromAccount(idAccount);

    // Now we can delete the current account
    await this.accountRespository.delete(idAccount);
  }

  private async _accountNameAlreadyExists(accountName: string): Promise<void> {
    const account = await this.getAccountByName(accountName);

    if (account) {
      throw new BadRequestException('Name of Account already exists');
    }
  }
}
