import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Product } from '../modules/products/products.entity';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Partial<Product>[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
