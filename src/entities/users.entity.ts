import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as id } from 'uuid';
import { Exclude } from 'class-transformer';
import { Order } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  country?: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  city?: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
