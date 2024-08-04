import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';

import { In, Repository } from 'typeorm';
import * as data from '../../data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoriesRepository.find();
  }

  async addCategories() {
    const categories = data.map((item) => item.category);

    const existingCategories = await this.categoriesRepository.find({
      where: { name: In(categories) },
    });

    const existingNames = existingCategories.map((category) => category.name);

    const newCategoriesData = data.filter((item) => {
      return !existingNames.includes(item.category);
    });

    const newCategories = this.categoriesRepository.create(newCategoriesData);

    return this.categoriesRepository.save(newCategories);
  }
}
