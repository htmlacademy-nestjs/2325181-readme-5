import { HttpService } from '@nestjs/axios';
import { Controller, Post, Req, Body, UseFilters } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserController {
  constructor (
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
