import { Controller, HttpStatus, UseGuards, Get, Param, Body, Req } from '@nestjs/common';
import { RequestWithTokenPayload, AuthUser } from '@project/libs/shared/app/types';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserRdo } from '../authentication/rdo/user.rdo';
import { UserService } from './user.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RequestUsersDto } from './dto/request-users.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) userId: string): Promise<UserRdo> {
    const existUser = await this.userService.getUserEntity(userId);
    return fillDTO(UserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The publisher has been added to user\' subscription'
  })
  @UseGuards(JwtAuthGuard)
  @Get('subscribe/:publisherId')
  public async subscribe(
    @Param('publisherId', MongoIdValidationPipe) publisherId: string,
    @Req() { user: {sub: userId} }: RequestWithTokenPayload
  ): Promise<UserRdo> {
    const subscribedUser = await this.userService.addSubscription(userId, publisherId);
    return fillDTO(UserRdo, subscribedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The publisher has been removed to user\' subscription'
  })
  @UseGuards(JwtAuthGuard)
  @Get('unsubscribe/:publisherId')
  public async unsubscribe(
    @Param('publisherId', MongoIdValidationPipe) publisherId: string,
    @Req() { user: {sub: userId} }: RequestWithTokenPayload
  ): Promise<UserRdo> {
    const subscribedUser = await this.userService.removeSubscription(userId, publisherId);
    return fillDTO(UserRdo, subscribedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of user\'s subscribers provided'
  })
  @Get('subscribers/:userId')
  public async countSubscribers(
    @Param('userId', MongoIdValidationPipe) userId: string
  ): Promise<number> {
    return await this.userService.countSubscribers(userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users list has been provided'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async index(
    @Body() {authorList}: RequestUsersDto
  ): Promise<UserRdo> {
    const usersList = await this.userService.indexUsers(authorList);
    return fillDTO<UserRdo, AuthUser[]>(UserRdo, usersList.map((user) => user.toPOJO()));
  }

}
