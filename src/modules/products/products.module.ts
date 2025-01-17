import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/products.entity';
import { Category } from '../../entities/categories.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [TypeOrmModule.forFeature([Product, Category])],
})
export class ProductsModule {}
