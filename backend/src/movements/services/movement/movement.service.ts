import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogDto } from 'src/movements/dtos';
import { Repository } from 'typeorm';
import { Movement } from '../../../typeorm/entities';
import { action } from 'src/movements/types';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  async getLogs(): Promise<Movement[]> {
    return await this.movementRepository.find();
  }

  async createLog(createLogDto: CreateLogDto): Promise<Movement> {
    const message = this._generateMessage(
      createLogDto.accountName,
      createLogDto.emailUser,
      createLogDto.action,
    );
    const movement = this.movementRepository.create({ description: message });
    return await this.movementRepository.save(movement);
  }

  private _generateMessage(
    nameAccount: string,
    emailUser: string,
    typeMovement: action,
  ) {
    const message = `User with email: ${emailUser} was ${typeMovement} from account: ${nameAccount}`;
    return message;
  }
}
