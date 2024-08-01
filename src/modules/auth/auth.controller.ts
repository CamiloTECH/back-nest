import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../../dtos/LoginUserDto.dto';
import { CreateUserDto } from '../../dtos/CreateUserDto.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Auth');
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signIn(credentials);
  }
}
