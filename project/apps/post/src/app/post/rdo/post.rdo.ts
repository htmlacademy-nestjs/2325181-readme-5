import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post unique ID',
    example: '1234-5678-9012-3456'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Post type: video, text, photo, cite, link',
    example: 'video'
  })
  public type: string;

  @Expose()
  @ApiProperty({
    description: 'Publishing status',
    example: 'true'
  })
  public isPublished: boolean;

  @Expose()
  @ApiProperty({
    description: 'Repost status',
    example: 'false'
  })
  public isRepost: boolean;

  @Expose()
  @ApiProperty({
    description: 'Unique author ID',
    example: '1234-5678-9012-3456'
  })
  public authorId: string;

  @Expose()
  @ApiProperty({
    description: 'Origin author unique ID',
    example: '1234-5678-9012-3456'
  })
  public originAuthorId?: string;

  @Expose()
  @ApiProperty({
    description: 'Origin Post unique ID',
    example: '1234-5678-9012-3456'
  })
  public originPostId?: string;

  @Expose()
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  public tags: string[];

  @Expose()
  @ApiProperty({
    description: 'In case of photo type, the photo file',
    example: ''
  })
  public photo: string;

  @Expose()
  @ApiProperty({
    description: 'In case of cite type, the cite creator',
    example: 'William Shakespeare'
  })
  public creator: string;


  @Expose()
  @ApiProperty({
    description: 'In case of cite type, the cite text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  public citeText: string

  @Expose()
  @ApiProperty({
    description: 'In case of link type, the link URL',
    example: '/blog.com/file/post1.html'
  })
  public linkURL: string;

  @Expose()
  @ApiProperty({
    description: 'In case of link type, the link description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  public linkDescription: string

  @Expose()
  @ApiProperty({
    description: 'In case of text type, the announce text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  public announce: string;

  @Expose()
  @ApiProperty({
    description: 'In case of text type, the post text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  public text: string

  @Expose()
  @ApiProperty({
    description: 'In case of video type, the video URL.',
    example: '/video/video1.mp4'
  })
  public videoURL: string;

  @Expose()
  @ApiProperty({
    description: 'In case of text or video type, the post title',
    example: ''
  })
  public title: string;
}


