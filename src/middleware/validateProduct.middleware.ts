import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import Ajv from 'ajv';

import { NextFunction, Request, Response } from 'express';

const ajv = new Ajv();

const productSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    stock: {
      type: 'boolean',
    },
    imgUrl: {
      type: 'string',
    },
  },
  required: ['name', 'description', 'price', 'stock', 'imgUrl'],
  additionalProperties: false,
};

const validate = ajv.compile(productSchema);

@Injectable()
export class ValidateProductMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const product = req.body;
    const valid = validate(product);
    if (!valid) {
      throw new BadRequestException('Los datos son inválidos');
    }

    next();
  }
}
