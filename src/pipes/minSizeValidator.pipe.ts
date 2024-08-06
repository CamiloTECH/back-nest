import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 10000;
    if (!value || !value.size) {
      throw new BadRequestException('Error reading file');
    }
    if (value?.size < minSize) {
      throw new BadRequestException('The file size is very small');
    }
    return value;
  }
}
