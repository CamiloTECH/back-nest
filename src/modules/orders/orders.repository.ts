import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
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
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        order_details: { products: true },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async addOrder(order: CreateOrderDto) {
    const user = await this.usersRepository.findOne({
      where: { id: order.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validateProductArray = order.products.every((product) => {
      return 'id' in product;
    });

    if (!validateProductArray) {
      throw new BadRequestException('All products must have id prop');
    }

    const productsId = order.products.map(({ id }) => id);

    const products = await this.productsRepository.find({
      where: { id: In(productsId) },
    });

    if (products.length === 0 || products.length < productsId.length) {
      throw new NotFoundException('Products or product not available');
    }

    const stockAvailable = products.filter(({ stock }) => stock === 0);
    if (stockAvailable.length) {
      const productsOutStock = stockAvailable.map(({ id, name }) => ({
        id,
        name,
      }));
      throw new BadRequestException(productsOutStock, {
        description: 'These products are out of stock',
      });
    }

    const newOrder = this.ordersRepository.create({
      user_id: user,
      date: new Date(),
    });
    const orderSave = await this.ordersRepository.save(newOrder);

    let totalPrice = 0;
    const newProducts = products.map((product) => {
      totalPrice += Number(product.price);
      return { ...product, stock: product.stock - 1 };
    });

    await this.productsRepository.save(newProducts);

    const newOrderDetail = this.orderDetailsRepository.create({
      order_id: orderSave,
      products: products,
      price: totalPrice,
    });

    await this.orderDetailsRepository.save(newOrderDetail);

    return this.ordersRepository.findOne({
      where: { id: orderSave.id },
      relations: ['order_details'],
    });
  }
  async deleteOrder(orderId: string) {
    const findOrder = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: {
        order_details: {
          products: true,
        },
      },
    });
    if (!findOrder) {
      throw new NotFoundException('Order not found');
    }

    const products = findOrder.order_details.products.map(({ id }) => id);

    const findProduct = await this.productsRepository.find({
      where: { id: In(products) },
    });

    const updateProduct = findProduct.map(({ id, stock }) => {
      return this.productsRepository.update({ id }, { stock: stock + 1 });
    });

    const waiting = await Promise.all(updateProduct);

    if (!waiting) {
      throw new BadRequestException('Error');
    }

    return this.ordersRepository.delete({ id: orderId });
  }
}
