import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ValidateUserMiddleware } from 'src/middleware/validateUser.middleware';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserMiddleware)
      .forRoutes(
        { path: 'users/:id', method: RequestMethod.PUT },
        { path: 'users', method: RequestMethod.POST },
      );
  }
}
