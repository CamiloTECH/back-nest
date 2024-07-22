import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

const validateRequest = (request: Request) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    throw new UnauthorizedException('Authorization header is missing');
  }

  const [type, credentials] = authHeader.split(' ');

  if (type !== 'Basic') {
    throw new UnauthorizedException('Authorization type is not Basic');
  }

  const decodedCredentials = Buffer.from(credentials, 'base64').toString(
    'ascii',
  );

  const [email, password] = decodedCredentials.split(':');

  if (!email || !password) {
    throw new UnauthorizedException('Invalid email or password format');
  }

  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
