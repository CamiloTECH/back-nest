import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { OrderDetail } from './orderDetails.entity';

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

  async addOrder(order: { userId: string; products: { id: string }[] }) {
    const user = await this.usersRepository.findOne({
      where: { id: order.userId },
    });
    if (user) {
      const productsId = order.products.map(({ id }) => id);

      const newOrder = new Order();
      newOrder.user_id = user;
      newOrder.date = new Date();

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

      const newOrderDetail = new OrderDetail();
      newOrderDetail.order_id = orderSave;
      newOrderDetail.products = products;
      const price = updateProducts.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
      newOrderDetail.price = price;

      await this.orderDetailsRepository.save(newOrderDetail);

      const orderFind = await this.ordersRepository.findOne({
        where: { id: orderSave.id },
        relations: {
          order_details: true,
        },
      });
      return orderFind;
    }

    return { message: 'Error' };
  }
}
