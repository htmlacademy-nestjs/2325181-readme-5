import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async signin(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, firstname, lastname, password} = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      passwordHash: '',
      avatar: ''
    }

    const existUser = await this.blogUserRepository.findByEmail(email);

    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }
}
