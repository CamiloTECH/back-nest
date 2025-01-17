import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as id } from 'uuid';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity({ name: 'order_detail' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.order_details, {
    onDelete: 'CASCADE',
  })
  order_id: Order;

  @ManyToMany(() => Product, (product) => product.order_details)
  products: Product[];
}
