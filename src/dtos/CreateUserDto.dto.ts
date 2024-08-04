import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * El nombre debe ser un texto con minimo tres caracteres
   * @example Camilo
   *
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @MinLength(3)
  name: string;

  /**
   * Debe ser un email valido y no debe existir en la base
   * @example camilo@gmail.com
   *
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*
   * @example David1234*
   *
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;

  /**
   * La contraseña debe ser igual al campo "password"*
   * @example David1234*
   *
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  confirmPassword: string;

  /**
   * Debe ser un texto con minimo tres caracteres
   * @example Carrera 14D # 12a
   *
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un numero valido
   * @example 1598585500
   *
   */
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  /**
   * Debe ser un texto con minimo 5 carateres y maximo 20
   * @example Colombia
   *
   */
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un texto con minimo 5 carateres y maximo 20
   * @example Bogota
   *
   */
  @IsString()
  @MinLength(5)
  @IsOptional()
  @MaxLength(20)
  city: string;

  /**
   * Es un campo con valor por defecto en la base. No debe ir en el cuerpo del body
   * @example false
   *
   */
  @IsEmpty()
  @IsOptional()
  @ApiHideProperty()
  isAdmin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
