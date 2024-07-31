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
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto, UpdateUserDto } from '../../dtos/CreateUserDto.dto';
import { Request } from 'express';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../roles.enum';
import { RolesGuard } from '../../guards/roles.guard';
// import { DateAddedInterceptor } from 'src/interceptors/dateAdder.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(DateAddedInterceptor)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createUser(@Body() user: Omit<CreateUserDto, 'confirmPassword'>) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(
    @Body() user: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
