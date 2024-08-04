import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';

import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoriesRepository.find();
  }

  async addCategories(categories: { name: string }[]) {
    const createCategories = await this.categoriesRepository.save(categories);
    return createCategories;
  }
}
