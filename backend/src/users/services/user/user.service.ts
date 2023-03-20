import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateNormalUserDto,
  UpdateUserDto,
} from 'src/users/dtos';
import { Repository } from 'typeorm';
import { AccountService } from '../../../accounts/services/account/account.service';
import { MovementService } from '../../../movements/services/movement/movement.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly accountService: AccountService,
    private readonly movementService: MovementService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return user;
  }

  async getUsersFromAccount(idAccount: number): Promise<User[]> {
    const account = await this.accountService.getAccountById(idAccount);

    return await this.usersRepository.find({
      where: {
        account,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    await this._emailAlreadyExists(createUserDto.email);
    const { password, confirmPassword } = createUserDto;
    this._passwordsMatch(password, confirmPassword);

    const passwordHashed = await this._hashPassword(password);
    const userData = { ...createUserDto, password: passwordHashed };

    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  async updateUser(
    idUser: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.email)
      await this._emailAlreadyExists(updateUserDto.email);

    const user = await this.getUserById(idUser);
    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async updateNormalUser(
    idUser: number,
    updateNormalUserDto: UpdateNormalUserDto,
  ): Promise<User> {
    const user = await this.getUserById(idUser);
    return await this.usersRepository.save({ ...user, ...updateNormalUserDto });
  }

  async changePassword(
    idUser: number,
    changePassswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.getUserById(idUser);
    const { password, confirmPassword } = changePassswordDto;

    this._passwordsMatch(password, confirmPassword);
    const passwordHashed = await this._hashPassword(password);

    await this.usersRepository.save({ ...user, password: passwordHashed });
  }

  async setUserAccount(idAccount: number, idUser: number): Promise<User> {
    const user = await this.getUserById(idUser);
    const account = await this.accountService.getAccountById(idAccount);

    user.account = account;

    await this.movementService.createLog({
      emailUser: user.email,
      accountName: account.accountName,
      action: 'added',
    });

    return await this.usersRepository.save(user);
  }

  async removeUserAccount(idUser: number): Promise<User> {
    const user = await this.getUserById(idUser);
    user.account = null;

    return await this.usersRepository.save(user);
  }

  async removeAllUsersFromAccount(idAccount: number): Promise<void> {
    const account = await this.accountService.getAccountById(idAccount);

    await this.usersRepository.update({ account }, { account: null });
  }

  async deleteUser(idUser: number): Promise<void> {
    const user = await this.getUserById(idUser);
    await this.usersRepository.delete(user.id);
  }

  private async _emailAlreadyExists(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new BadRequestException(
        `User already exists with that email: ${email}`,
      );
    }
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private _passwordsMatch(password: string, confirmPassword: string): void {
    if (password != confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }
  }
}
