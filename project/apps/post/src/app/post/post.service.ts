import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND } from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  public async createNewPost(dto: CreatePostDto): Promise<PostEntity> {
    const {
      type,
      tags,
      photo,
      creator,
      citeText,
      linkDescription,
      linkURL,
      announce,
      text,
      videoURL,
      title
    } = dto;

    const postDraft = {
      type,
      tags,
      photo: photo || '',
      creator: creator || '',
      citeText: citeText || '',
      linkDescription: linkDescription || '',
      linkURL: linkURL || '',
      announce: announce || '',
      text: text || '',
      videoURL: videoURL || '',
      title: title || '',
      isPublished: false,
      isRepost: false,
      authorId: '',
      originPostId: '',
      originAuthorId: ''
    }
    const newPost =  await new PostEntity(postDraft);

    return this.postRepository.save(newPost);
  }

  public async getPostEntity(postId: string): Promise<PostEntity> {
    const existPost = await this.postRepository.findById(postId);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return await this.postRepository.findById(postId);
  }

  public async updatePostEntity(postId: string, dto: UpdatePostDto): Promise<PostEntity> {
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

  public async indexPosts(): Promise<PostEntity[] | []> {
    return this.postRepository.findMany();
  }

  public async repostPost(postId: string): Promise<PostEntity> {
    const {id: originPostId, authorId: originAuthorId, ...originPost} = await this.postRepository.findById(postId);

    const repostedPost = new PostEntity({
      ...originPost,
      authorId: '',
      isRepost: true,
      originPostId,
      originAuthorId
    });

    return this.postRepository.save(repostedPost);

  }
}
