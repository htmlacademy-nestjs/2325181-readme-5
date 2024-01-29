import { Body, Controller, Get, Req, Patch, Delete, Param, Query, Post, UseFilters, UseGuards, HttpCode, HttpStatus, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL, getAuthHeader } from '../app.config';
import { CreateContentPostDtoType, UpdatePostDto} from '../dto';
import { SubscriptionFilterQuery, FilterQuery, SearchQuery} from '../query';
import { EntitiesWithPaginationRdo, RequestWithTokenPayload } from '@project/libs/shared/app/types';
import { PostRdo, UserRdo} from '../rdo';
import { generateUsersReference } from '../helpers';

@UseFilters(AxiosExceptionFilter)
@Controller('post')
export class PostController {
  constructor (
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been created.'
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateContentPostDtoType,
    @Req() req: Request,
  ): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<PostRdo>(`${ApplicationServiceURL.Post}`, dto, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been found.'
  })
  @Get('/')
  public async index(
    @Query() filter: FilterQuery
  ): Promise<EntitiesWithPaginationRdo<PostRdo>> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<EntitiesWithPaginationRdo<PostRdo>>(`${ApplicationServiceURL.Post}`,{ params: filter});
      const authorList = Array.from(new Set(data.entities.map((entity) => entity.authorId)));
      const { data: users } = await this.httpService.axiosRef.post<UserRdo[]>(`${ApplicationServiceURL.User}`, {authorList});
      const usersReference: Map<string, UserRdo> = generateUsersReference(users);
      const newEntities = data.entities.map((entity) => ({
        ...entity,
        authorFirstname: usersReference.get(entity.authorId).firstname,
        authorLastname: usersReference.get(entity.authorId).lastname,
        authorEmail: usersReference.get(entity.authorId).email
      }));
      return {...data, entities: newEntities}
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The subscription posts have been found.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('subscription')
  public async indexSubscribed(
    @Query() filter: SubscriptionFilterQuery,
    @Req() { user: { sub } } : RequestWithTokenPayload,
    @Req() req: Request,
  ): Promise<EntitiesWithPaginationRdo<PostRdo>> {
    try {
      const { data: { subscribedFor }} = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/${sub}`);
      const subscriptionFilter = {...filter, authorList: subscribedFor};
      const { data } = await this.httpService.axiosRef
        .get<EntitiesWithPaginationRdo<PostRdo>>(`${ApplicationServiceURL.Post}/subscription`,{
           params: subscriptionFilter,
           ...getAuthHeader(req)
          });
      return data
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following posts have been searched and found'
  })
  @Get('search')
  public async search(@Query() query: SearchQuery): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/search`, {params: query});
        return data;
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The following draft posts have been found'
  })
  @UseGuards(CheckAuthGuard)
  @Get('drafts')
  public async indexDrafts(@Req() req: Request): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/drafts`, getAuthHeader(req));
        return data;
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new posts have been sent'
  })
  @UseGuards(CheckAuthGuard)
  @Get('news')
  public async getNewPosts(
    @Query() filter: FilterQuery,
    @Req() req: Request
  ):Promise<void> {
    try {
      await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/news`, {
          params: filter,
          ...getAuthHeader(req)
         });
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The reposted post has been created.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('repost/:postId')
  public async repost(
    @Req() req: Request,
    @Param('postId') postId: string
  ): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/repost/${postId}`, getAuthHeader(req));
        return data;
    } catch (err) {
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
      if (err.response.status === 403) {
        throw new ForbiddenException('User may not repost own posts');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post status has been changed to drafts'
  })
  @UseGuards(CheckAuthGuard)
  @Get('draft/:postId')
  public async returnToDrafts(
    @Req() req: Request,
    @Param('postId') postId: string,
  ): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/draft/${postId}`, getAuthHeader(req));
        return data;
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post status has been changed to published'
  })
  @UseGuards(CheckAuthGuard)
  @Get('publish/:postId')
  public async publish(
    @Req() req: Request,
    @Param('postId') postId: string,
  ): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<PostRdo>(`${ApplicationServiceURL.Post}/publish/${postId}`, getAuthHeader(req));
        return data;
    } catch (err) {
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post details have been provided.'
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string): Promise<PostRdo> {
    try {
      const { data: existPost } = await this.httpService.axiosRef.get<PostRdo>(`${ApplicationServiceURL.Post}/${postId}`);
      const { data: existUser } = await this.httpService.axiosRef.get<UserRdo>(`${ApplicationServiceURL.User}/${existPost.authorId}`);
      return {
        ...existPost,
        authorEmail: existUser.email,
        authorFirstname: existUser.firstname,
        authorLastname: existUser.lastname
       };
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Post not found');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been updated.'
  })
  @UseGuards(CheckAuthGuard)
  @Patch(':postId')
  public async update(
    @Req() req: Request,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto
  ): Promise<PostRdo> {
    try {
      const { data } = await this.httpService.axiosRef.patch<PostRdo>(`${ApplicationServiceURL.Post}/${postId}`, dto, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Post not found');
      }
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
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
    @Req() req: Request,
  ): Promise<void> {
    try {
      await this.httpService.axiosRef.delete<void>(`${ApplicationServiceURL.Post}/${postId}`, getAuthHeader(req));
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Post not found');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

}
