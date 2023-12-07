import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDTO } from '@project/libs/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('signin')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo | null> {
    const newUser = await this.authService.registerNewUser(dto);
    return fillDTO(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<LoggedUserRdo | null> {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDTO(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  public async show(@Param('id') userId: string): Promise<UserRdo | null> {
    const existUser = await this.authService.getUserEntity(userId);
    return fillDTO(UserRdo, existUser.toPOJO());
  }

}
