import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  /**
   * Debe ser el nombre del producto
   * @example Iphone 15
   *
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  /**
   * Debe ser la descripcion del producto
   * @example Celular Iphone nuevo
   *
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  description: string;

  /**
   * Debe ser el precio del producto
   * @example 2500
   *
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  /**
   * Debe ser el stock o cantidades disponibles de ese producto
   * @example 10
   *
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  stock: number;

  /**
   * Debe ser la categoria a la que pertenece ese producto
   * @example smartphone
   *
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  category: string;

  /**
   * Debe ser la imagen desde una url del producto
   * @example https://www.verbodivino.co/producto-sin-imagen.png
   *
   */
  @IsUrl()
  @IsOptional()
  @IsString()
  imgUrl: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
