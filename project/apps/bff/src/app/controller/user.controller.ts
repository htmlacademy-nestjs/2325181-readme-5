import { HttpService } from '@nestjs/axios';
import { Controller, Patch, Param, Post, Get, Req, Body, UseFilters, HttpStatus, HttpCode, UseGuards, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginUserDto, CreateUserDto, ChangePasswordDto } from '../dto';
import { ApplicationServiceURL, getAuthHeader } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedUserRdo, UserRdo } from '../rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { MongoIdValidationPipe } from '@project/libs/shared/core';

@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserController {
  constructor (
    private readonly httpService: HttpService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user already exists.'
  })
  @Post('signin')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<UserRdo>(`${ApplicationServiceURL.Auth}/signin`, dto);
      return data;
    } catch (err) {
        if (err.response.status === 409) {
          throw new ConflictException('User already exists');
        }
    }
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
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<LoggedUserRdo>(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Change user password'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(CheckAuthGuard)
  @Patch('password')
  public async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request): Promise<LoggedUserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.patch<LoggedUserRdo>(`${ApplicationServiceURL.Auth}/password`, dto, getAuthHeader(req));
      return data
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
      if (err.response.status === 404) {
        throw new NotFoundException('User not found');
      }
    }
  }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'User subscription posts provided'
  // })
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(CheckAuthGuard)
  // @Get('subscription')
  // public async indexSubscribed(
  //   @Req() { user } : RequestWithTokenPayload
  // ): Promise<void> {
  //   const {subscribedFor} = await this.show(user.sub);
  //   const
  // }

// в конце
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) userId: string): Promise<UserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/${userId}`);
      return data
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('User not found');
      }
    }
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
