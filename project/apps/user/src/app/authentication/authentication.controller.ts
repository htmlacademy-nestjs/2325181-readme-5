import { Controller, Post, Patch, Body, Get, Param, HttpStatus, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDTO } from '@project/libs/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyUserService } from '../notify/notify-user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser, RequestWithTokenPayload, Token } from '@project/libs/shared/app/types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

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
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() {user}: RequestWithUser ): Promise<LoggedUserRdo> {
    const userToken = await this.authService.createUserToken(user);
    return fillDTO(LoggedUserRdo, {...user, ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new pair of JWT Tokens'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser):Promise<Token> {
    return this.authService.createUserToken(user)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Change user password'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  public async changePassword(@Body() dto: ChangePasswordDto, @Req() { user: payload }: RequestWithTokenPayload): Promise<LoggedUserRdo> {
    const updateUser = (await this.authService.changePassword(payload, dto)).toPOJO();
    const userToken = await this.authService.createUserToken(updateUser);
    return fillDTO(LoggedUserRdo, {...updateUser, ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checks if the token payload exists'
  })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

}
