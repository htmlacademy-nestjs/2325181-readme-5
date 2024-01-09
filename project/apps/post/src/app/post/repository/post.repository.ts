import { PostContentEntity } from '../entity/post-content.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { PostContent } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto';
import { POST_SEARCH_BY_TITLE_LIMIT } from '../post.constant';

export class PostRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(postDraft:PostContentEntity): Promise<PostContent> {
    return this.prisma.post.create({
      data: {
        ...postDraft
      }
    });

  }

  public async findById(postId: string): Promise<PostContent> {
    return this.prisma.post.findFirst({
      where: {
        id: postId
      }
    })
  }

  public async updateById(postId: string, dto: UpdatePostDto): Promise<PostContent> {
    return this.prisma.post.update({
      where: {
        id: postId
      },
      data: {...dto, id: postId}
    })
  }

  public async deleteById(postId: string): Promise<void> {
    this.prisma.post.delete({
      where: {
        id: postId
      }
    })
  }

  public async findMany(): Promise<PostContent[]> {
    return this.prisma.post.findMany();
  }

  public async searchByTitle(postTitle: string): Promise<PostContent[]> {
    return this.prisma.post.findMany({
      where: {
        title: {
          contains: postTitle
        }
      },
      take: POST_SEARCH_BY_TITLE_LIMIT
    })
  }

  public async indexDrafts(userId: string): Promise<PostContent[]>  {
    return this.prisma.post.findMany({
      where: {
        isPublished: false,
        authorId: userId
      }
    })
  }
}
