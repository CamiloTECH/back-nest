import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateUserDto } from 'src/dtos/CreateUserDto.dto';
// import { DateAddedInterceptor } from 'src/interceptors/dateAdder.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(DateAddedInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 5,
  ) {
    return this.usersService.getUsers({ page, limit });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
