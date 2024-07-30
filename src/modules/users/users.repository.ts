import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/CreateUserDto.dto';

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
      relations: { orders: true },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async createUser(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    const saveUser = await this.usersRepository.save(newUser);
    return { id: saveUser.id };
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const updateUser = await this.usersRepository.update({ id }, user);
    if (updateUser.affected) {
      return { id, ...updateUser };
    }
    throw new NotFoundException('User not found');
  }

  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.delete({ id });
    if (deleteUser.affected) {
      return { id, ...deleteUser };
    }
    throw new NotFoundException('User not found');
  }

  async signinUser(credentials: { email: string; password: string }) {
    const findUser = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });
    if (findUser && findUser.password === credentials.password) {
      return findUser;
    }

    throw new BadRequestException('User or password incorrect');
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
