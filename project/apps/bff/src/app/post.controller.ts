import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { CreateContentPostDtoType } from './dto';

@UseFilters(AxiosExceptionFilter)
@Controller('post')
export class PostController {
  constructor (
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateContentPostDtoType) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/`, dto);
    return data;
  }
}
