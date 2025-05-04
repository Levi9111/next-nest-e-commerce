import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform<T>(value: Record<string, unknown>): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formatted = result.error.format();
      throw new BadRequestException({
        message: 'Validation failed!',
        errors: formatted,
      });
    }

    return result.data as T;
  }
}
