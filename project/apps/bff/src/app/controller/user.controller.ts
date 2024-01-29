import { HttpService } from '@nestjs/axios';
import { Controller, Patch, Param, Post, Get, Req, Body, UseFilters, HttpStatus, HttpCode, UseGuards, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginUserDto, CreateUserDto, ChangePasswordDto } from '../dto';
import { ApplicationServiceURL, getAuthHeader } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedUserRdo, UserRdo, PostRdo } from '../rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { EntitiesWithPaginationRdo } from '@project/libs/shared/app/types';
import { ExceptionMessage } from '../app.constant';

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
        if (err.response.status === HttpStatus.CONFLICT) {
          throw new ConflictException(ExceptionMessage.UserAlreadyExists);
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
      if (err.response.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(ExceptionMessage.UserNotAuthorized);
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
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException('User not authorized');
      }
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.UserNotFound);
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new pair of JWT Tokens'
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.UserNotFound);
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The publisher has been added to user\' subscription'
  })
  @UseGuards(CheckAuthGuard)
  @Get('subscribe/:publisherId')
  public async subscribe(
    @Param('publisherId', MongoIdValidationPipe) publisherId: string,
    @Req() req: Request
  ): Promise<UserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/subscribe/${publisherId}`, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.UserNotFound);
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The publisher has been removed from user\' subscription'
  })
  @UseGuards(CheckAuthGuard)
  @Get('unsubscribe/:publisherId')
  public async unsubscribe(
    @Param('publisherId', MongoIdValidationPipe) publisherId: string,
    @Req() req: Request
  ): Promise<UserRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/unsubscribe/${publisherId}`, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.UserNotFound);
      }
    }
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) userId: string): Promise<UserRdo> {
    try {
      const { data: userData } = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/${userId}`);
      const { data: subscribersCount } = await this.httpService.axiosRef.get<number>(`${ApplicationServiceURL.User}/subscribers/${userId}`);
      const filter = {authorId: userId}
      const { data: {entities} } = await this.httpService.axiosRef
        .get<EntitiesWithPaginationRdo<PostRdo>>(`${ApplicationServiceURL.Post}`,{ params: filter});
      return {...userData, subscribersCount, publicationsCount: entities.length}
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.UserNotFound);
      }
    }
  }
}
