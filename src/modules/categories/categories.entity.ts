import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as id } from 'uuid';
import { Product } from '../products/products.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = id();

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
}
