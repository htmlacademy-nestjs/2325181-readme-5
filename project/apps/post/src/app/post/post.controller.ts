import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Get, Param, HttpStatus, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';



export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Post()
  public async create(@Body() dto: CreatePostDto): Promise<PostRdo> {

  }
}
