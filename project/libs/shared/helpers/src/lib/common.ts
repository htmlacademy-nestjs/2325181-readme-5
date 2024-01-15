import { ClassTransformOptions, plainToInstance } from 'class-transformer';

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
