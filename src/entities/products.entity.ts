import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as id } from 'uuid';

import { OrderDetail } from './orderDetails.entity';
import { Category } from './categories.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({
    type: 'varchar',
    default: 'https://www.verbodivino.co/producto-sin-imagen.png',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  @ManyToMany(() => OrderDetail, (order) => order.products)
  @JoinTable({
    name: 'products_orderDetails',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'order_detail_id',
    },
  })
  order_details: OrderDetail[];
}
