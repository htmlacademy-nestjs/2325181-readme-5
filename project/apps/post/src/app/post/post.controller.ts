import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post, Body, Get, Param, HttpStatus, Delete, Patch, Controller } from '@nestjs/common';
import { fillDTO} from '@project/libs/shared/helpers';
import { PostService } from './post.service';
import { CreateContentPostDtoType } from './dto';
import { PostRdo } from './rdo/post.rdo';
import { UpdatePostDto } from './dto/update-post.dto';


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
  public async createVideoPost(@Body() dto: CreateContentPostDtoType): Promise<PostRdo> {
    const newPost = await this.postService.createNewPost(dto);
    return fillDTO((PostRdo), newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post details have been provided.'
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string): Promise<PostRdo> {
    const existPost = await this.postService.getPostEntity(postId);
    return fillDTO((PostRdo), existPost.toPOJO());
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
}
