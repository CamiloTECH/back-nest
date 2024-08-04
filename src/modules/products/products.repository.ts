import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/dtos/CreateProductDto.dto';
import { Category } from '../../entities/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts({ page, limit }: { page: number; limit: number }) {
    return this.productsRepository.find({
      take: limit,
      skip: page - 1,
      where: { stock: MoreThan(0) },
      relations: { category_id: true },
    });
  }

  async getProduct(id: string) {
    const user = await this.productsRepository.findOne({
      where: { id },
      relations: { category_id: true, order_details: true },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Product not found');
  }

  async createProduct(product: CreateProductDto) {
    const newUsers = this.productsRepository.create(product);
    const saveUser = await this.productsRepository.save(newUsers);
    return { id: saveUser.id };
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    const updateProduct = await this.productsRepository.update({ id }, product);
    if (updateProduct.affected) {
      return updateProduct;
    }
    throw new NotFoundException('Product not found');
  }

  async deleteProduct(id: string) {
    const deleteProduct = await this.productsRepository.delete({ id });
    if (deleteProduct.affected) {
      return { id, ...deleteProduct };
    }
    throw new NotFoundException('Product not found');
  }

  async addProducts(products: CreateProductDto[]) {
    const categories = await this.categoriesRepository.find();

    const productsInsert = products.map((product) => {
      return {
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category_id: categories.find(({ name }) => name === product.category),
      };
    });

    const resultInsert = await this.productsRepository.save(productsInsert);
    return resultInsert;
  }
}
