import { Controller, Post, Body, Get, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDTO } from '@project/libs/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyUserService } from '../notify/notify-user.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyUserService: NotifyUserService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been created.'
  })
  @Post('signin')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const newUser = await this.authService.registerNewUser(dto);
    const { email, firstname, lastname } = newUser;
    await this.notifyUserService.registerSubscriber({ email, firstname, lastname });
    return fillDTO(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged in.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password of login is wrong.'
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<LoggedUserRdo> {
    const verifiedUser = (await this.authService.verifyUser(dto));
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDTO(LoggedUserRdo, {...verifiedUser.toPOJO(), ...userToken});
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) userId: string): Promise<UserRdo> {
    const existUser = await this.authService.getUserEntity(userId);
    return fillDTO(UserRdo, existUser.toPOJO());
  }
}
