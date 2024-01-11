import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class PostWithPaginationRdo {
  @Expose()
  public entities: PostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;

}
