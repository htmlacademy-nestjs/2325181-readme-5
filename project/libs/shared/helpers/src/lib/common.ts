import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { DateTimeUnit, TimeAndUnit, PostContent } from '@project/libs/shared/app/types';

export function fillDTO<T, V>(
  DtoClass: new() => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;
export function fillDTO<T, V>(
  DtoClass: new() => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];
export function fillDTO<T, V>(
  DtoClass: new() => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T| T[] {
  return plainToInstance(
    DtoClass,
    plainObject,
    {
      excludeExtraneousValues: true,
      ... options
    }
  );
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function transformTags(tags: string[]): string[] {
  return Array.from(new Set(tags.map((tag) => tag.toLowerCase())));
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);
  if(!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }
  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;
  if(isNaN(value)) {
    throw new Error(`[parseTime] Can't pars value count. Result is NaN.`);
  }
  return { value, unit }
}

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;


export const filterNewPosts = (posts: PostContent[], newPostsUpdate: Date) => posts.filter((post) => post.publishedAt >= newPostsUpdate);

