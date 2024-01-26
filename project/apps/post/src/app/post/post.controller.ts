import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post, Body, Get, Param, HttpStatus, Delete, Patch, Controller, Query, Req, UseGuards, HttpCode, } from '@nestjs/common';
import { fillDTO} from '@project/libs/shared/helpers';
import { PostService } from './post.service';
import { CreateContentPostDtoType } from './dto';
import { PostRdo } from './rdo/post.rdo';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchQuery } from './query/search.query';
import { PostContent, PaginationResult, RequestWithUser, RequestWithTokenPayload } from '@project/libs/shared/app/types';
import { FilterQuery } from './query/filter.query';
import { NotifyPostService } from '../notify/notify-post.service';
import { EntitiesWithPaginationRdo } from '@project/libs/shared/app/types';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { SubscriptionFilterQuery } from './query/subscription-filter.query';


@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly notifyPostService: NotifyPostService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been created.'
  })
  @Post('/')
  public async create(
    @Body() dto: CreateContentPostDtoType,
    @Req() {user}: RequestWithTokenPayload
  ): Promise<PostRdo> {
    const newPost = await this.postService.createNewPost(dto, user.sub);
    return fillDTO(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been found.'
  })
  @Get('/')
  public async index(@Query() filter: FilterQuery): Promise<EntitiesWithPaginationRdo<PostRdo>> {
    const postsWithPagination = await this.postService.indexPosts(filter);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }
    return fillDTO<EntitiesWithPaginationRdo<PostRdo>, PaginationResult<PostContent>>(EntitiesWithPaginationRdo<PostRdo>, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been found.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('subscription')
  public async indexSubscribed(@Query() filter: SubscriptionFilterQuery): Promise<EntitiesWithPaginationRdo<PostRdo>> {
    const postsWithPagination = await this.postService.indexPosts(filter);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }
    return fillDTO<EntitiesWithPaginationRdo<PostRdo>, PaginationResult<PostContent>>(EntitiesWithPaginationRdo<PostRdo>, result);
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
  @UseGuards(CheckAuthGuard)
  @Get('drafts')
  public async indexDrafts(@Req() { user }: RequestWithTokenPayload): Promise<PostRdo> {
    const draftsList = await this.postService.indexUserDrafts(user.email);
    return fillDTO<PostRdo, PostContent[]>(PostRdo, draftsList.map((post) => post.toPOJO()));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new posts have been sent'
  })
  @UseGuards(CheckAuthGuard)
  @Get('news')
  public async getNewPosts(
    @Query() filter: FilterQuery
  ):Promise<void> {
    const newPosts = await this.postService.indexPosts(filter);
    this.notifyPostService.sendNewPosts(newPosts.entities.map((post) => post.toPOJO()))
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The reposted post has been created.'
  })
  @UseGuards(CheckAuthGuard)
  @Post('repost/:postId')
  public async repost(
    @Req() {user}: RequestWithTokenPayload,
    @Param('postId') postId: string
  ): Promise<PostRdo> {
    const repostedPost = await this.postService.repostPost(postId, user.sub);
    return fillDTO(PostRdo, repostedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post status has been changed to drafts'
  })
  @Patch('draft/:postId')
  async returnToDrafts(
    @Req() { user }: RequestWithTokenPayload,
    @Param('postId') postId: string,
  ): Promise<PostRdo> {
    const dto = {isPublished: false};
    const draftedPost = await this.postService.updatePostEntity(postId, user.sub, dto);
    return fillDTO(PostRdo, draftedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post status has been changed to published'
  })
  @Patch('publish/:postId')
  async publish(
    @Req() { user }: RequestWithTokenPayload,
    @Param('postId') postId: string,
  ): Promise<PostRdo> {
    const dto = {isPublished: true};
    const publishedPost = await this.postService.updatePostEntity(postId, user.sub, dto);
    return fillDTO(PostRdo, publishedPost.toPOJO());
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
  @UseGuards(CheckAuthGuard)
  @Patch(':postId')
  public async update(
    @Req() { user }: RequestWithTokenPayload,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto
  ): Promise<PostRdo> {
    const updatedPost = await this.postService.updatePostEntity(postId, user.sub, dto);
    return fillDTO(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The post has been deleted.'
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':postId')
  public async delete(
    @Param('postId') postId: string,
    @Req() { user }: RequestWithTokenPayload,
  ): Promise<void> {
    await this.postService.deletePostEntity(postId, user.sub);
  }
}
