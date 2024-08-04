import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, MoreThan, Repository } from 'typeorm';
import { User } from '../../entities/users.entity';
import { Product } from '../../entities/products.entity';
import { OrderDetail } from '../../entities/orderDetails.entity';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';
import { Order } from '../../entities/orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}
  async getOrder(id: string) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: {
        order_details: {
          products: {
            category_id: true,
          },
        },
      },
    });
  }

  async addOrder(order: CreateOrderDto) {
    const user = await this.usersRepository.findOne({
      where: { id: order.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productsId = order.products.map(({ id }) => id);

    const newOrder = this.ordersRepository.create({
      user_id: user,
      date: new Date(),
    });
    const orderSave = await this.ordersRepository.save(newOrder);

    const products = await this.productsRepository.find({
      where: {
        id: In(productsId),
        stock: MoreThan(0),
      },
    });

    const newProducts = products.map((product) => ({
      ...product,
      stock: product.stock - 1,
    }));
    const updateProducts = await this.productsRepository.save(newProducts);

    const totalPrice = updateProducts.reduce((sum, product) => {
      return sum + Number(product.price);
    }, 0);
    const newOrderDetail = this.orderDetailsRepository.create({
      order_id: orderSave,
      products: products,
      price: totalPrice,
    });

    await this.orderDetailsRepository.save(newOrderDetail);

    const orderFind = await this.ordersRepository.findOne({
      where: { id: orderSave.id },
      relations: ['order_details'],
    });
    return orderFind;
  }
}
