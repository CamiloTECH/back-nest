import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ValidateProductMiddleware } from 'src/middleware/validateProduct.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from '../categories/categories.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [TypeOrmModule.forFeature([Product, Category])],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateProductMiddleware)
      .forRoutes(
        { path: 'products/:id', method: RequestMethod.PUT },
        { path: 'products', method: RequestMethod.POST },
      );
  }
}
