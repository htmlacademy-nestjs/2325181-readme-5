import { ClassTransformOptions, plainToInstance } from 'class-transformer';



export function fillDTO<T, V extends Record<string, unknown>>(
  DtoClass: new() => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;
export function fillDTO<T, V extends Record<string, unknown>[]>(
  DtoClass: new() => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];
export function fillDTO<T, V extends Record<string, unknown>>(
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