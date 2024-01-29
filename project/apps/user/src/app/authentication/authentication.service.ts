import { ConflictException, Injectable, NotFoundException, UnauthorizedException, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { Token, AuthUser, TokenPayload } from '@project/libs/shared/app/types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/libs/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/libs/shared/core';
import * as crypto from 'node:crypto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async registerNewUser(dto: CreateUserDto):Promise<UserEntity> {
    const {email, firstname, lastname, password, avatar} = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    const user = {
      email,
      firstname,
      lastname,
      passwordHash: '',
      avatar: avatar ?? '',
    }
    const userEntity = await new UserEntity(user).setPassword(password);
    const savedUser = await this.userRepository.save(userEntity);
    savedUser.subscribedFor.push(savedUser.id);
    return await this.userRepository.update(savedUser.id, savedUser);
  }

  public async changePassword (payload: TokenPayload, dto: ChangePasswordDto): Promise<UserEntity> {
    const loginUserDto: LoginUserDto = {email: payload.email, password: dto.oldPassword}
    const existUser = await this.verifyUser(loginUserDto);
    const updateUser = await existUser.setPassword(dto.newPassword);
    return await this.userRepository.update(updateUser.id, updateUser);
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const {email, password} = dto;
    const existUser = await this.getUserByEmail(email);
    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    return existUser;
  }

  public async createUserToken(user: AuthUser): Promise<Token> {

    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {...accessTokenPayload, tokenId: crypto.randomUUID()};
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
