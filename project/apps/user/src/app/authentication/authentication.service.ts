import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly UserRepository: UserRepository
  ) {}

  public async registerNewUser(dto: CreateUserDto): Promise<UserEntity> {
    const {email, firstname, lastname, password} = dto;

    const User = {
      email,
      firstname,
      lastname,
      passwordHash: '',
      avatar: ''
    }

    const existUser = await this.UserRepository.findByEmail(email);

    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(User).setPassword(password);

    return this.UserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const {email, password} = dto;
    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const UserEntity = new UserEntity(existUser);
    if (!(await UserEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return UserEntity
  }

  public async getUserEntity(id: string): Promise<UserEntity> {
    return this.UserRepository.findById(id);
  }
}
