import { UserRole, EnglishLevel } from '../enums';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    description: 'User english level',
  })
  @IsOptional()
  @IsEnum(EnglishLevel)
  englishLevel?: EnglishLevel;

  @ApiProperty({
    description: 'User CV link',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  CVLink?: string;

  @ApiProperty({
    description: 'User knowledge description',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  technicalKnowledge?: string;

  @ApiProperty({
    enum: ['admin', 'super admin', 'user'],
    description: 'Type of role of user',
    default: 'user',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
