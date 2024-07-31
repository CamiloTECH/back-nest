import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../../dtos/CreateUserDto.dto';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from '../../dtos/LoginUserDto.dto';
import { Role } from '../../roles.enum';

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
    const { confirmPassword, ...restUser } = user;
    const comparePassword = restUser.password === confirmPassword;

    if (!comparePassword) {
      throw new BadRequestException('Passwords must match');
    }
    const hashedPassword = await bcrypt.hash(restUser.password, 5);
    if (!hashedPassword) {
      throw new BadRequestException('Error in signUp');
    }
    return this.usersRepository.createUser({
      ...restUser,
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
      roles: [findUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);
    return { token, success: true };
  }
}
