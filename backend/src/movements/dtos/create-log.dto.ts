import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Action } from '../enums';
import { action } from '../types';

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  emailUser: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsEnum(Action)
  action: action;
}
