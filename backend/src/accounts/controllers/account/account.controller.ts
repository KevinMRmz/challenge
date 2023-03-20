import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateAccountDto, UpdateAccountDto } from '../../dtos';
import { AccountService } from '../../services/account/account.service';
//import { JwtAuthGuard } from 'src/guards/jwt-guard/jwt-auth.guard';

@ApiTags('Accounts')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all accounts',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAccounts() {
    return await this.accountService.getAccounts();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get account by Id',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleAccount(@Param('id', ParseIntPipe) id: number) {
    return await this.accountService.getAccountById(id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create an account',
  })
  @ApiBadRequestResponse({ description: 'Information not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  //@UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.createAccount(createAccountDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update an account',
  })
  @ApiBadRequestResponse({
    description:
      '[Id provided is not a number, information provided is not valid]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({
    description: 'Account was not found',
  })
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccoutDto: UpdateAccountDto,
  ) {
    return await this.accountService.updateAccount(id, updateAccoutDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an account',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({
    description: 'Account was not found',
  })
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    await this.accountService.deleteAccount(id);

    return {
      message: 'User has been deleted successfully',
      success: true,
    };
  }
}
