import { Prisma} from '@prisma/client';
import { PostFilter } from '@project/libs/shared/app/types';

export function postFilterToPrismaFilter(filter: PostFilter): Prisma.PostWhereInput | undefined {
  if(! filter) {
    return undefined;
  };
  let prismaFilter: Prisma.PostWhereInput = {};
  for(let key in filter) {
    prismaFilter[key] = filter[key];
  }
  return prismaFilter;
}
