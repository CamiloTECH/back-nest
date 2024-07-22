import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderDetail } from './orderDetails.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
