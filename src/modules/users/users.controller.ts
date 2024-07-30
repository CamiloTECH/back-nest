import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/CreateUserDto.dto';
import { Request } from 'express';
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
    @Req() request: Request,
  ) {
    console.log(request);

    const parsePage = parseInt(page);
    const parseLimit = parseInt(limit);
    return this.usersService.getUsers({ page: parsePage, limit: parseLimit });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() user: Omit<CreateUserDto, 'confirmPassword'>) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Body() user: UpdateUserDto,
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
