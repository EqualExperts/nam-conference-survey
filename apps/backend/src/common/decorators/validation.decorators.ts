import { applyDecorators } from '@nestjs/common';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsIn,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Transform empty strings to undefined
 */
const transformEmptyStringToUndefined = () =>
  Transform(({ value }) => {
    if (value === '' || value === null) {
      return undefined;
    }
    return value;
  });

/**
 * Combines @IsOptional() and @IsString() with empty string handling
 */
export function OptionalString(): PropertyDecorator {
  return applyDecorators(
    transformEmptyStringToUndefined(),
    IsOptional(),
    IsString(),
  );
}

/**
 * Combines @IsOptional(), @IsInt(), @Min(), and @Max()
 */
export function OptionalInt(min: number, max: number): PropertyDecorator {
  return applyDecorators(IsOptional(), IsInt(), Min(min), Max(max));
}

/**
 * Combines @IsOptional(), @IsString(), and @IsIn() with auto-generated message and empty string handling
 */
export function OptionalEnum(
  values: readonly string[],
  fieldName: string,
): PropertyDecorator {
  return applyDecorators(
    transformEmptyStringToUndefined(),
    IsOptional(),
    IsString(),
    IsIn([...values], {
      message: `${fieldName} must be ${values.join(', ')}`,
    }),
  );
}

/**
 * Combines @IsOptional(), @IsArray(), and @IsString({ each: true })
 */
export function OptionalStringArray(): PropertyDecorator {
  return applyDecorators(IsOptional(), IsArray(), IsString({ each: true }));
}
