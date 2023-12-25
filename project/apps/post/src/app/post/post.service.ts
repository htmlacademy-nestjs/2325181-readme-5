import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND } from './post.constant';
import { PostEntityAdapter} from './post-entity.factory';
import { CreateContentPostDtoType } from './dto';
import { PostContentEntity } from './entity/post-content.entity';


@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  public async createNewPost(dto: CreateContentPostDtoType): Promise<PostContentEntity> {
    const {type, ...content} = dto;
    const newPostDraft = await new PostEntityAdapter[type]({
      type,
      ...content,
      isPublished: false,
      isRepost: false,
      authorId: '',
      originPostId: '',
      originAuthorId: ''
    });
    return this.postRepository.save(newPostDraft);

  }

  public async getPostEntity(postId: string): Promise<PostContentEntity> {
    const existPost = await this.postRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return await this.postRepository.findById(postId);
  }

  public async updatePostEntity(postId: string, dto: UpdatePostDto): Promise<PostContentEntity> {
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

  public async indexPosts(): Promise<PostContentEntity[]> {
    return this.postRepository.findMany();
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
}
