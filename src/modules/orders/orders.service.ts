import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dtos/CreateOrderDto.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(order: CreateOrderDto) {
    return this.ordersRepository.addOrder(order);
  }
}
