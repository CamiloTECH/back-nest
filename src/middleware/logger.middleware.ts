import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(
//       `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`,
//     );
//     next();
//   }
// }

export const LoggerGlobal = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const date = new Date();

  console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
  console.log(
    `A las ${date.getHours()}:${date.getUTCMinutes()} del ${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()}`,
  );
  next();
};
