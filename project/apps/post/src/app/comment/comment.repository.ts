import { BasePostgresRepository } from '@project/libs/shared/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment} from '@project/libs/shared/app/types'
import { PrismaClientService } from '@project/libs/shared/post/models';
import { COMMENT_LIST_REUQEST_COUNT } from './comment.constant';

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
      throw new NotFoundException(`Comment with id ${id} not found.`);
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

  public async findManyByPostId(postId: string): Promise<CommentEntity[]> {
    const foundComments = await this.client.comment.findMany({
      where: {
        postId,
      },
      take: COMMENT_LIST_REUQEST_COUNT
    });
    return foundComments.map((comment) => this.createEntityFromDocument(comment));
  }

  public async deleteManyByPostId(postId: string): Promise<void> {
    await this.client.comment.deleteMany({
      where: {
        postId,
      }
    });
  }

}
