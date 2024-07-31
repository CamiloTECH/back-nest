import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dtos/CreateUserDto.dto';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: Partial<AuthService>;

  const mockUser: CreateUserDto = {
    name: 'david',
    email: 'david@gmail.com',
    password: 'David1234*',
    confirmPassword: 'David1234*',
    phone: 1234,
    country: 'Colombia',
    address: 'address',
    city: 'Bogota',
    isAdmin: false,
  };

  beforeEach(async () => {
    authService = {
      signIn: () => Promise.resolve({ success: true, token: 'token valido' }),
      signUp: ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmPassword,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isAdmin,
        ...rest
      }: CreateUserDto) =>
        Promise.resolve({ ...rest, id: 'idDeprueba', orders: [] }),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('SignIn should return an token', async () => {
    const signInUser = authController.signIn({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(signInUser).toBeDefined();
    expect(signInUser).toHaveProperty('token');
  });
});
