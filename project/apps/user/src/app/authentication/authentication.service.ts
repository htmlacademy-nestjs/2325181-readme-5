import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async registerNewUser(dto: CreateUserDto): Promise<UserEntity> {
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

    return userEntity
  }

  public async getUserEntity(id: string): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }
}
