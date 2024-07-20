import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import Ajv from 'ajv';

import { NextFunction, Request, Response } from 'express';
import { User } from 'src/models/userModel';

const ajv = new Ajv();

const userSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    country: {
      type: ['string', 'null'],
    },
    city: {
      type: ['string', 'null'],
    },
  },
  required: ['email', 'name', 'password', 'address', 'phone'],
  additionalProperties: false,
};
const validate = ajv.compile(userSchema);

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body;
    const valid = validate(user);
    if (!valid) {
      throw new BadRequestException('Los datos son inválidos');
    }
    next();
  }
}
