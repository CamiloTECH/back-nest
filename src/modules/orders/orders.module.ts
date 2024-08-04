import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetail } from '../../entities/orderDetails.entity';
import { User } from '../../entities/users.entity';
import { Product } from '../../entities/products.entity';
import { Order } from '../../entities/orders.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
