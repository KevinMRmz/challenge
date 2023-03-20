import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  accountName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  clientName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  operationManagerName: string;
}
