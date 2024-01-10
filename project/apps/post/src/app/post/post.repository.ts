import { PostContentEntity } from './entity/post-content.entity';
import { PostContent} from '@project/libs/shared/app/types';
import { POST_LIST_REUQEST_COUNT, POST_SEARCH_BY_TITLE_LIMIT } from './post.constant';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { PrismaClientService } from '@project/libs/shared/post/models';
import { PostEntityFactory } from './post-entity.factory';
import { Injectable} from '@nestjs/common';
import { postFilterToPrismaFilter } from './filter/post.filter';
import { FilterQuery } from './query/filter.query';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostContentEntity, PostContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostEntityFactory)
  }

  public async save(postEntity:PostContentEntity): Promise<PostContentEntity> {
    const postDraft = await this.client.post.create({
      data: {...postEntity.toPOJO()}
    });
    postEntity.id = postDraft.id;
    return postEntity;
  }

  public async findById(id: string): Promise<PostContentEntity> {
    const existPost = await this.client.post.findFirst({
      where: {id}
    });
    return this.createEntityFromDocument(existPost);
  }

  public async updateById(postEntity: PostContentEntity): Promise<PostContentEntity> {
    const updatedPost = await this.client.post.update({
      where: {id: postEntity.id},
      data: {...postEntity.toPOJO()}
    });
    return this.createEntityFromDocument(updatedPost);
  }

  public async deleteById(id: string): Promise<void> {
    this.client.post.delete({
      where: {id}
    })
  }

  public async findMany(filter?: FilterQuery): Promise<PostContentEntity[]> {
    const where = {isPublished: true, ...filter ?? postFilterToPrismaFilter(filter)};
    const postList = await this.client.post.findMany({
      where,

      take: POST_LIST_REUQEST_COUNT
    });
    return postList.map((post) => this.createEntityFromDocument(post));
  }

  public async searchByTitle(postTitle: string): Promise<PostContentEntity[]> {
    const postList = await this.client.post.findMany({
      where: {
        isPublished: true,
        title: {
          contains: postTitle
        }
      },
      take: POST_SEARCH_BY_TITLE_LIMIT
    })

    return postList.map((post) => this.createEntityFromDocument(post));
  }

  public async indexDrafts(authorId: string): Promise<PostContentEntity[]>  {
    const postList = await this.client.post.findMany({
      where: {
        isPublished: false,
        authorId
      }
    })
    return postList.map((post) => this.createEntityFromDocument(post));
  }
}
