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

    if (findUser?.email) {
      throw new BadRequestException('User already exist');
    }
    const { confirmPassword, password, ...restUser } = user;
    const comparePassword = password === confirmPassword;

    if (!comparePassword) {
      throw new BadRequestException('Passwords are not the same');
    }
    const hashedPassword = await bcrypt.hash(password, 5);
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
    const { password, isAdmin, ...restUser } = findUser;
    const isValidUser = await bcrypt.compare(user.password, password);
    if (!isValidUser) {
      throw new BadRequestException('Email or password incorrect');
    }
    const userPayload = {
      id: findUser.id,
      sub: findUser.id,
      email: findUser.email,
      roles: [isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);
    return { token, ...restUser };
  }
}
