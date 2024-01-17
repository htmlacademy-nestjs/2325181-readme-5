import { PostContentEntity } from './entity/post-content.entity';
import { PostContent} from '@project/libs/shared/app/types';
import { Prisma } from '@prisma/client';
import { POST_LIST_REUQEST_COUNT, POST_SEARCH_BY_TITLE_LIMIT } from './post.constant';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { PrismaClientService } from '@project/libs/shared/post/models';
import { PostEntityFactory } from './post-entity.factory';
import { Injectable} from '@nestjs/common';
import { FilterQuery } from './query/filter.query';
import { PaginationResult } from '@project/libs/shared/app/types';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostContentEntity, PostContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostEntityFactory)
  }

  public async save(postEntity:PostContentEntity): Promise<PostContentEntity> {
    const postPojo = postEntity.toPOJO();
    const postDraft = await this.client.post.create({
      data: {
        ...postPojo,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    });
    postEntity.id = postDraft.id;
    return postEntity;
  }

  public async findById(id: string): Promise<PostContentEntity> {
    const existPost = await this.client.post.findFirst({
      where: {id},
      include: {
        comments: true,
      }
    });
    return this.createEntityFromDocument(existPost);
  }

  public async updateById(postEntity: PostContentEntity): Promise<PostContentEntity> {
    const {comments, ...postPojo} = postEntity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: {id: postEntity.id},
      include: {
        comments: true
      },
      data: {
        ...postPojo,
      },
    });
    return this.createEntityFromDocument(updatedPost);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {id}
    });
  }

  public async findMany({authorId, type, tag, page, sortBy}: FilterQuery): Promise<PaginationResult<PostContentEntity>> {
    const hasTag = tag ? {has: tag} : undefined;
    const where = {
      isPublished: true,
      authorId,
      type,
      tags: hasTag
    };
    const skip = (page - 1) * POST_LIST_REUQEST_COUNT;
    const orderBy: Prisma.PostOrderByWithRelationInput = {[sortBy]: 'desc'};
    const [postList, totalPosts] = await Promise.all([
      this.client.post.findMany({
        where,
        take: POST_LIST_REUQEST_COUNT,
        skip,
        include: {
          comments: true
        },
        orderBy
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: postList.map((post) => this.createEntityFromDocument(post)),
      currentPage: page,
      totalPages: Math.ceil(totalPosts / POST_LIST_REUQEST_COUNT),
      itemsPerPage: POST_LIST_REUQEST_COUNT,
      totalItems: totalPosts
    }
  }

  public async searchByTitle(postTitle: string): Promise<PostContentEntity[]> {
    const postList = await this.client.post.findMany({
      where: {
        isPublished: true,
        title: {
          contains: postTitle
        }
      },
      include: {
        comments: true
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
      },
      include: {
        comments: true
      }
    })
    return postList.map((post) => this.createEntityFromDocument(post));
  }

  private async getPostCount (where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({where});
  }
}
