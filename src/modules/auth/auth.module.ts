import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
