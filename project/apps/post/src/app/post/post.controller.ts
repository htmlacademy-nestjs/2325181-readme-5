import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post, Body, Get, Param, HttpStatus, Delete, Patch, Controller, Query, Req } from '@nestjs/common';
import { fillDTO} from '@project/libs/shared/helpers';
import { PostService } from './post.service';
import { CreateContentPostDtoType } from './dto';
import { PostRdo } from './rdo/post.rdo';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchQuery } from './query/search.query';
import { PostContent } from '@project/libs/shared/app/types';
import { RequestWithToken, PaginationResult } from '@project/libs/shared/app/types';
import { FilterQuery } from './query/filter.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';


@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been created.'
  })
  @Post('/')
  public async create(@Body() dto: CreateContentPostDtoType): Promise<PostRdo> {
    const newPost = await this.postService.createNewPost(dto);
    return fillDTO(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post details have been provided.'
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string): Promise<PostRdo> {
    const existPost = await this.postService.getPostEntity(postId);
    return fillDTO(PostRdo, existPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been updated.'
  })
  @Patch(':postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto): Promise<PostRdo> {
    const updatedPost = await this.postService.updatePostEntity(postId, dto);
    return fillDTO(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The post has been deleted.'
  })
  @Delete(':postId')
  public async delete(@Param('postId') postId: string): Promise<void> {
    await this.postService.deletePostEntity(postId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The reposted post has been created.'
  })
  @Post('repost/:postId')
  public async repost(@Param('postId') postId: string): Promise<PostRdo> {
    const repostedPost = await this.postService.repostPost(postId);
    return fillDTO(PostRdo, repostedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been found.'
  })
  @Get('/')
  public async index(@Query() filter: FilterQuery): Promise<PostWithPaginationRdo> {
    const postsWithPagination = await this.postService.indexPosts(filter);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }
    return fillDTO<PostWithPaginationRdo, PaginationResult<PostContent>>(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been searched and found'
  })
  @Get('search')
  public async search(@Query() query: SearchQuery): Promise<PostRdo> {
    const postSearchList = await this.postService.searchPostsByTitle(query.title)
    return fillDTO<PostRdo, PostContent[]>(PostRdo, postSearchList.map((post) => post.toPOJO()));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following draft posts have been found'
  })
  @Get('drafts')
  public async indexDrafts(@Req() { user }: RequestWithToken): Promise<PostRdo> {
    const draftsList = await this.postService.indexUserDrafts(user.sub);
    return fillDTO<PostRdo, PostContent[]>(PostRdo, draftsList.map((post) => post.toPOJO()));
  }
}
