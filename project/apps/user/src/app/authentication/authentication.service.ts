import { ConflictException, Injectable, NotFoundException, UnauthorizedException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { TokenPayload, Token, AuthUser } from '@project/libs/shared/app/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async registerNewUser(dto: CreateUserDto):Promise<UserEntity> {
    const {email, firstname, lastname, password} = dto;
    const user = {
      email,
      firstname,
      lastname,
      passwordHash: '',
      avatar: '',
      likesList: []
    }
    const existUser = await this.userRepository.findByEmail(email);
    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    const userEntity = await new UserEntity(user).setPassword(password);
    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    const userEntity = new UserEntity(existUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
    return userEntity;
  }

  public async getUserEntity(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    const userEntity = new UserEntity(existUser);
    return userEntity;
  }

  public async createUserToken(user: AuthUser): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
    };
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  }
}
