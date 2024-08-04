import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Order } from '../../entities/orders.entity';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../../dtos/CreateUserDto.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersRepository>;
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
    mockUsersService = {
      getUserByEmail: () => Promise.resolve(undefined),
      createUser: ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isAdmin,
        ...rest
      }: Omit<CreateUserDto, 'confirmPassword'>): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        city?: string;
        country?: string;
        orders: Order[];
      }> => Promise.resolve({ ...rest, id: 'idDeprueba', orders: [] }),
    };

    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'testSecret'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersRepository, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('SignUp create a new user', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user).not.toHaveProperty('password');
    expect(user).not.toHaveProperty('isAdmin');
  });

  it('SignUp throws an error if the email is already exist ', async () => {
    mockUsersService.getUserByEmail = () => {
      return Promise.resolve({ ...mockUser, id: 'idDePrueba', orders: [] });
    };
    try {
      await authService.signUp(mockUser);
    } catch (error) {
      expect(error.message).toEqual('Email already exist');
    }
  });

  it('SignIn returns an error if the password is invalid', async () => {
    mockUsersService.getUserByEmail = () => {
      return Promise.resolve({ ...mockUser, id: 'idDePrueba', orders: [] });
    };

    try {
      await authService.signIn({
        email: mockUser.email,
        password: 'invalidPassword',
      });
    } catch (error) {
      expect(error.message).toEqual('Email or password incorrect');
    }
  });

  it('SignIn returns an object with a message with a token', async () => {
    const mockUserVariant = {
      ...mockUser,
      id: 'idDePrueba',
      orders: [],
      password: await bcrypt.hash(mockUser.password, 10),
    };

    mockUsersService.getUserByEmail = () => {
      return Promise.resolve(mockUserVariant);
    };
    const response = await authService.signIn({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('success');
  });
});
