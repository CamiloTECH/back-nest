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
  /**
   * Debe ser un user uuid valido
   * @example 8499b08e-ccbd-4f52-a0d0-39ab55bf46a0
   *
   */
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string;

  /**
   * Debe ser un array de objetos, en donde cada objeto tiene el id del producto que va en la orden
   * @example "[{"id": "70a50af8-b962-4eca-95fa-4645ed4cac1f"},{"id": "53472629-c058-40dd-b921-3e2af6d003e2"}]"
   *
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Partial<Product>[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
