import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as id } from 'uuid';
import { OrderDetail } from './orderDetails.entity';
import { User } from './users.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'date', default: new Date() })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToOne(() => OrderDetail, (detail) => detail.order_id)
  @JoinColumn({ name: 'order_detail_id' })
  order_details: OrderDetail;
}
