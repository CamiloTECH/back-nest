import { Injectable } from '@nestjs/common';
import { User } from 'src/models/userModel';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'camilo@gmail.com',
      name: 'camilo',
      password: '123456789',
      address: 'direccion ',
      phone: '32165165',
      country: 'Colombia',
      city: 'Bogota',
    },
  ];

  async getUsers({ page, limit }: { page: number; limit: number }) {
    return this.users.slice(page - 1, limit);
  }

  async getUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const { address, email, id, name, phone, city, country } = user;
      return { address, email, id, name, phone, city, country };
    }
    return { message: 'User not found' };
  }

  async createUser(user: Omit<User, 'id'>) {
    const newUsers: User = {
      id: `${this.users.length + 1}`,
      ...user,
    };
    this.users.push(newUsers);
    return { id: newUsers.id };
  }

  async updateUser(id: string, user: Omit<User, 'id'>) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      const updateUser = { ...this.users[userIndex], ...user };
      this.users[userIndex] = updateUser;
      return { id: updateUser.id };
    }
    return { message: 'User not found' };
  }

  async deleteUser(id: string) {
    const newUsers = this.users.filter((user) => user.id !== id);
    if (newUsers.length < this.users.length) {
      this.users = newUsers;
      return { id };
    }
    return { message: 'User not found' };
  }

  async signinUser(credentials: { email: string; password: string }) {
    const findUser = this.users.find(({ email }) => {
      return email === credentials.email;
    });
    if (findUser && findUser.password === credentials.password) {
      return findUser;
    }
    return {
      message: 'User or password incorrect',
    };
  }
}
