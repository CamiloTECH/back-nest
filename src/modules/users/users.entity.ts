import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as id } from 'uuid';
import { Order } from '../orders/orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country?: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city?: string;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
