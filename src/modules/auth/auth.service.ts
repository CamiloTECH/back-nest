import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUserDto.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from 'src/dtos/LoginUserDto.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const findUser = await this.usersRepository.getUserByEmail(user.email);
    if (findUser) {
      throw new BadRequestException('Email already exist');
    }
    const hashedPassword = await bcrypt.hash(user.password, 5);
    if (!hashedPassword) {
      throw new BadRequestException('Error in signUp');
    }
    return this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(user: LoginUserDto) {
    const findUser = await this.usersRepository.getUserByEmail(user.email);
    if (!findUser) {
      throw new BadRequestException('Email or password incorrect');
    }
    const isValidUser = await bcrypt.compare(user.password, findUser.password);
    if (!isValidUser) {
      throw new BadRequestException('Email or password incorrect');
    }
    const userPayload = {
      id: findUser.id,
      sub: findUser.id,
      email: findUser.email,
    };

    const token = this.jwtService.sign(userPayload);
    return { token, success: true };
  }
}
