import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND, USER_NOT_AUTHORIZED } from './post.constant';
import { PostEntityAdapter} from './post-entity.factory';
import { CreateContentPostDtoType } from './dto';
import { PostContentEntity } from './entity/post-content.entity';
import { FilterQuery } from './query/filter.query';
import { transformTags } from '@project/libs/shared/helpers';
import { PaginationResult } from '@project/libs/shared/app/types';



@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  public async createNewPost(dto: CreateContentPostDtoType, userId: string): Promise<PostContentEntity> {
    const {type, tags, ...content} = dto;
    const tagsLowerUnique = transformTags(tags);
    const newPostDraft = new PostEntityAdapter[type]({
      type,
      tags: tagsLowerUnique,
      ...content,
      isPublished: true,
      isRepost: false,
      authorId: userId,
      originPostId: '',
      originAuthorId: '',
      comments: [],
      likes: [],
    });
    return await this.postRepository.save(newPostDraft);

  }

  public async getPostEntity(postId: string): Promise<PostContentEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return existPost;
  }

  public async updatePostEntity(postId: string,  userId: string, dto: UpdatePostDto,): Promise<PostContentEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    if ( existPost.authorId !== userId) {
      throw new UnauthorizedException(USER_NOT_AUTHORIZED);
    }
    const updateEntity = new PostEntityAdapter[existPost.type]({
      ...existPost,
      ...dto,
      });
    return await this.postRepository.updateById(updateEntity);
  }

  public async deletePostEntity(postId: string, userId: string): Promise<void> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    if ( existPost.authorId !== userId) {
      throw new UnauthorizedException(USER_NOT_AUTHORIZED);
    }
    this.postRepository.deleteById(postId);
  }

  public async indexPosts(filter?: FilterQuery): Promise<PaginationResult<PostContentEntity>> {
     return await this.postRepository.findMany(filter);
  }

  public async repostPost(postId: string, userId: string): Promise<PostContentEntity> {
    const {
      id: originPostId,
      authorId: originAuthorId,
      publishedAt,
      ...originPost
    } = await this.postRepository.findById(postId);
    const repostedPost = new PostEntityAdapter[originPost.type]({
      ...originPost,
      authorId: userId,
      isRepost: true,
      originPostId,
      originAuthorId,
      publishedAt: new Date()
    });
    return this.postRepository.save(repostedPost);
  }

  public async searchPostsByTitle(postTitle: string): Promise<PostContentEntity[]> {
    return this.postRepository.searchByTitle(postTitle);
  }

  public async indexUserDrafts (userId: string): Promise<PostContentEntity[]> {
    return this.postRepository.indexDrafts(userId);
  }
}
