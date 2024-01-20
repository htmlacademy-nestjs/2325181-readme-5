import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND } from './post.constant';
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

  public async createNewPost(dto: CreateContentPostDtoType): Promise<PostContentEntity> {
    const {type, tags, ...content} = dto;
    const tagsLowerUnique = transformTags(tags);
    const newPostDraft = new PostEntityAdapter[type]({
      type,
      tags: tagsLowerUnique,
      ...content,
      isPublished: false,
      isRepost: false,
      authorId: '',
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

  public async updatePostEntity(postId: string, dto: UpdatePostDto): Promise<PostContentEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    const updateEntity = new PostEntityAdapter[existPost.type]({
      ...existPost,
      ...dto,
      });
    return await this.postRepository.updateById(updateEntity);
  }

  public async deletePostEntity(postId: string): Promise<void> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    this.postRepository.deleteById(postId);
  }

  public async indexPosts(filter?: FilterQuery): Promise<PaginationResult<PostContentEntity>> {
     return this.postRepository.findMany(filter);
  }

  public async repostPost(postId: string): Promise<PostContentEntity> {
    const {id: originPostId, authorId: originAuthorId, ...originPost} = await this.postRepository.findById(postId);
    const repostedPost = new PostEntityAdapter[originPost.type]({
      ...originPost,
      authorId: '',
      isRepost: true,
      originPostId,
      originAuthorId
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
