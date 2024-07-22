import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers({ page, limit }: { page: number; limit: number }) {
    return this.usersRepository.find({ take: limit, skip: page - 1 });
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (user) {
      const { address, email, id, name, phone, city, country, orders } = user;
      return { address, email, id, name, phone, city, country, orders };
    }
    return { message: 'User not found' };
  }

  async createUser(user: Omit<User, 'id'>) {
    const newUser = this.usersRepository.create(user);
    const saveUser = await this.usersRepository.save(newUser);
    return { id: saveUser.id };
  }

  async updateUser(id: string, user: Omit<User, 'id'>) {
    const updateUser = await this.usersRepository.update({ id }, user);
    if (updateUser.affected) {
      return { id, ...updateUser };
    }
    return { message: 'User not found' };
  }

  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.delete({ id });
    if (deleteUser.affected) {
      return { id, ...deleteUser };
    }
    return { message: 'User not found' };
  }

  async signinUser(credentials: { email: string; password: string }) {
    const findUser = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });
    if (findUser && findUser.password === credentials.password) {
      return findUser;
    }
    return { message: 'User or password incorrect' };
  }
}
