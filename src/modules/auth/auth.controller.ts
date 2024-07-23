import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { LoginUserDto } from 'src/dtos/LoginUserDto.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersRepository: UsersRepository,
  ) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post()
  signin(@Body() credentials: LoginUserDto) {
    if (credentials.email && credentials.password) {
      return this.usersRepository.signinUser(credentials);
    }
    throw new BadRequestException('Los datos son inválidos');
  }
}
