import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/userModel';
import { AuthGuard } from 'src/auth/auth.guard';
// import { AuthGuard } from 'src/guards/auth.guard';
// import { DateAddedInterceptor } from 'src/interceptors/dateAdder.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(DateAddedInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
