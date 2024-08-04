import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import * as data from '../../data.json';

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
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category_id: true, order_details: true },
    });
    if (product) {
      if (product.stock === 0) {
        throw new BadRequestException('Product not available');
      }
      return product;
    }
    throw new NotFoundException('Product not found');
  }

  async createProduct(product: CreateProductDto) {
    const findProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });
    if (findProduct) {
      throw new BadRequestException('Product already exists');
    }
    const findCategory = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });
    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }
    const newProduct = this.productsRepository.create(product);
    newProduct.category_id = findCategory;
    const saveProduct = await this.productsRepository.save(newProduct);
    return saveProduct;
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

  async addProducts() {
    const productNames = data.map((item) => item.name);
    const categoryNames = data.map((item) => item.category);

    const existingCategories = await this.categoriesRepository.find({
      where: { name: In(categoryNames) },
    });

    const existingProducts = await this.productsRepository.find({
      where: { name: In(productNames) },
    });

    const existingProductNames = existingProducts.map(({ name }) => name);

    const newProductsData = data
      .filter((item) => !existingProductNames.includes(item.name))
      .map((item) => {
        return this.productsRepository.create({
          name: item.name,
          description: item.description,
          price: item.price,
          stock: item.stock,
          category_id: existingCategories.find(({ name }) => {
            return item.category === name;
          }),
        });
      });

    return this.productsRepository.save(newProductsData);
  }
}
