import { BasePostgresRepository } from '@project/libs/shared/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment, PaginationResult} from '@project/libs/shared/app/types'
import { PrismaClientService } from '@project/libs/shared/post/models';
import { COMMENT_LIST_REUQEST_COUNT, COMMENT_NOT_FOUND, DEFAULT_PAGE_NUMBER } from './comment.constant';
import { FilterQuery } from './query/filter.query';
import { Prisma } from '@prisma/client';


@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService
  ) {
    super(client, CommentEntity.fromObject)
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const commentDraft = await this.client.comment.create({
      data: {...entity.toPOJO()}
    });
    entity.id = commentDraft.id;
    return entity;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const existComment = await this.client.comment.findFirst({
      where: {
        id
      },
    });
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    return this.createEntityFromDocument(existComment);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }

  public async findMany(postId: string, {page}: FilterQuery): Promise<PaginationResult<CommentEntity>> {
    const skip = (page - DEFAULT_PAGE_NUMBER) * COMMENT_LIST_REUQEST_COUNT;
    const where = {
      postId,
    };
    const [foundComments, totalComments] = await Promise.all([
      this.client.comment.findMany({
        where,
        skip,
        take: COMMENT_LIST_REUQEST_COUNT
      }),
      this.getTotalComments(where)
    ])
    return {
      entities: foundComments.map((comment) => this.createEntityFromDocument(comment)),
      currentPage: page,
      totalPages: Math.ceil(totalComments /  COMMENT_LIST_REUQEST_COUNT),
      itemsPerPage: COMMENT_LIST_REUQEST_COUNT,
      totalItems: totalComments
    }
  }

  private async getTotalComments (where: Prisma.CommentWhereInput): Promise<number> {
    return this.client.comment.count({where});
  }
}
