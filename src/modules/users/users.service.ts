import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from '../../dtos/CreateUserDto.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(pagination: { page: number; limit: number }) {
    return this.usersRepository.getUsers(pagination);
  }

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  createUser(user: Omit<CreateUserDto, 'confirmPassword'>) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: UpdateUserDto) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
