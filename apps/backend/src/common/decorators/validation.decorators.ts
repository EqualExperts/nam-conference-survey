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

/**
 * Combines @IsOptional() and @IsString()
 */
export function OptionalString(): PropertyDecorator {
  return applyDecorators(IsOptional(), IsString());
}

/**
 * Combines @IsOptional(), @IsInt(), @Min(), and @Max()
 */
export function OptionalInt(min: number, max: number): PropertyDecorator {
  return applyDecorators(IsOptional(), IsInt(), Min(min), Max(max));
}

/**
 * Combines @IsOptional(), @IsString(), and @IsIn() with auto-generated message
 * Also accepts empty string '' (frontend sends '' for unselected options)
 */
export function OptionalEnum(
  values: readonly string[],
  fieldName: string,
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    IsString(),
    IsIn(['', ...values], {
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
