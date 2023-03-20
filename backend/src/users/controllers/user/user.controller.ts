import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/guards/jwt-guard/jwt-auth.guard';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateNormalUserDto,
  UpdateUserDto,
} from '../../dtos';
import { UserService } from '../../services/user/user.service';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  //  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found by ID.',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Get('single-user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users members of an account.',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Account Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Get('account/:idAccount')
  async getUsersFromAccount(@Param('idAccount') idAccount: number) {
    return await this.userService.getUsersFromAccount(idAccount);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User was created.',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  //  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User new password',
  })
  @ApiBadRequestResponse({
    description:
      '[id provided is not a number, new password provided is not correct]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Post('change-password/:id')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.userService.changePassword(id, changePasswordDto);

    return {
      message: 'Password has been changed succesfully',
      success: true,
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
  })
  @ApiBadRequestResponse({
    description: '[id provided is not a number, new user info is not correct]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
  })
  @ApiBadRequestResponse({
    description: '[id provided is not a number, new user info is not correct]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Patch('normal-user/:id')
  async updateNormalUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNormalUserDto: UpdateNormalUserDto,
  ) {
    return await this.userService.updateNormalUser(id, updateNormalUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Assign user to an account',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: '[User Not found, Account not found]' })
  //  @UseGuards(JwtAuthGuard)
  @Patch('set-account/:idAccount/:idUser')
  async setUserAccount(
    @Param('idAccount', ParseIntPipe) idAccount: number,
    @Param('idUser', ParseIntPipe) idUser: number,
  ) {
    return await this.userService.setUserAccount(idAccount, idUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove user current account',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Patch('remove-user-account/:idUser')
  async removeUserAccount(@Param('idUser', ParseIntPipe) idUser: number) {
    return await this.userService.removeUserAccount(idUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user',
  })
  @ApiBadRequestResponse({
    description: 'Id provided is not a number',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  //  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);

    return {
      message: 'User has been deleted successfully',
      success: true,
    };
  }
}
