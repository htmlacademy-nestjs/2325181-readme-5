import { Injectable, NotFoundException } from '@nestjs/common';
import { modifyLikesList} from '@project/libs/shared/helpers';
import { UserRepository } from './user.repository';
import { AUTH_USER_NOT_FOUND } from '../authentication/authentication.constant';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  public async editLikesList (postId: string, userId: string): Promise<void> {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    const updatedLikesList = modifyLikesList<string>(postId, existUser.likesList);
    const updatedUser = new UserEntity({...existUser, likesList: updatedLikesList})
    this.userRepository.update(postId, updatedUser);
  }
}
