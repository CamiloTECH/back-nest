import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(order: { userId: string; products: { id: string }[] }) {
    return this.ordersRepository.addOrder(order);
  }
}
