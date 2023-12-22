import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND } from './post.constant';
import { BasePostEntity } from './entity/base-post.entity';
import { PostContent, PostTypeValues } from '@project/libs/shared/app/types';
import { PostCiteRepository, PostPhotoRepository, PostLinkRepository, PostTextRepository, PostVideoRepository } from './repository/index';
import { PostEntityFactory } from './post-entity.factory';


@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postCiteRepository: PostCiteRepository,
    private readonly postPhotoRepository: PostPhotoRepository,
    private readonly postVideoRepository: PostVideoRepository,
    private readonly postTextRepository: PostTextRepository,
    private readonly postLinkRepository: PostLinkRepository,
  ) {}

  public async createNewPost(dto: CreatePostDto, type: PostTypeValues): Promise<BasePostEntity> {
    const {tags, ...postContent} = dto;
    const [postContentDraft, postContentRepository] = PostEntityFactory(type, postContent);
    const contentId = (await this[postContentRepository].save(postContentDraft)).id;
    const basePostDraft = {
      type,
      tags,
      contentId,
      isPublished: false,
      isRepost: false,
      authorId: '',
      originPostId: '',
      originAuthorId: ''
    }

    const newPost =  await new BasePostEntity(basePostDraft);
    return this.postRepository.save(newPost);

  }

  public async getPostEntity(postId: string): Promise<BasePostEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return await this.postRepository.findById(postId);
  }

  public async updatePostEntity(postId: string, dto: UpdatePostDto): Promise<BasePostEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    existPost.update(dto)
    return await this.postRepository.findById(postId);
  }

  public async deletePostEntity(postId: string): Promise<void> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    this.postRepository.deleteById(postId);
  }

  public async indexPosts(): Promise<BasePostEntity[]> {
    return this.postRepository.findMany();
  }

  public async repostPost(postId: string): Promise<BasePostEntity> {
    const {id: originPostId, authorId: originAuthorId, ...originPost} = await this.postRepository.findById(postId);
    const repostedPost = new BasePostEntity({
      ...originPost,
      authorId: '',
      isRepost: true,
      originPostId,
      originAuthorId
    });
    return this.postRepository.save(repostedPost);
  }
}
