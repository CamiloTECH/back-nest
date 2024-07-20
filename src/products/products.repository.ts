import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/productModel';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Celular',
      description: 'Este es un celular',
      price: 5000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
    {
      id: '2',
      name: 'Computador',
      description: 'Este es un computador',
      price: 8000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
    {
      id: '3',
      name: 'Computador',
      description: 'Este es un computador',
      price: 8000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
    {
      id: '4',
      name: 'Computador',
      description: 'Este es un computador',
      price: 8000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
    {
      id: '5',
      name: 'Computador',
      description: 'Este es un computador',
      price: 8000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
    {
      id: '6',
      name: 'Computador',
      description: 'Este es un computador',
      price: 8000,
      stock: true,
      imgUrl: 'Esta es la imagen',
    },
  ];

  getProducts({ page, limit }: { page: number; limit: number }) {
    const value = this.products.slice(page - 1, limit);
    return value;
  }

  async getProduct(id: string) {
    const user = this.products.find((product) => product.id === id);
    return user || { message: 'Product not found' };
  }

  async createProduct(product: Omit<Product, 'id'>) {
    const newUsers: Product = {
      id: `${this.products.length + 1}`,
      ...product,
    };
    this.products.push(newUsers);
    return { id: newUsers.id };
  }

  async updateProduct(id: string, product: Omit<Product, 'id'>) {
    const productIndex = this.products.findIndex((user) => user.id === id);
    if (productIndex >= 0) {
      const updateProduct = { ...this.products[productIndex], ...product };
      this.products[productIndex] = updateProduct;
      return updateProduct;
    }
    return { message: 'Product not found' };
  }

  async deleteProduct(id: string) {
    const newProduct = this.products.filter((user) => user.id !== id);
    if (newProduct.length < this.products.length) {
      this.products = newProduct;
      return { id };
    }
    return { message: 'Product not found' };
  }
}
