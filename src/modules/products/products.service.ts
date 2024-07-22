import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(pagination: { page: number; limit: number }) {
    return this.productsRepository.getProducts(pagination);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  createProduct(products: Product) {
    return this.productsRepository.createProduct(products);
  }

  updateProduct(id: string, Products: Product) {
    return this.productsRepository.updateProduct(id, Products);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

  addProducts(products: any[]) {
    return this.productsRepository.addProducts(products);
  }
}
