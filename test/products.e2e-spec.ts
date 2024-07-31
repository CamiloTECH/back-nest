import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /products return an array of products', async () => {
    const req = await request(app.getHttpServer()).get('/products');

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /products/:id return an product', async () => {
    const req = await request(app.getHttpServer()).get(
      '/products/518312d3-a898-4884-ab13-5d9475d428b0',
    );

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Get /products/:id throws an NotFoundExeption if the user dont found', async () => {
    const req = await request(app.getHttpServer()).get(
      '/products/518312d3-a898-4884-ab13-5d9475d428b0000',
    );

    expect(req.status).toBe(404);
    expect(req.body.message).toBe('Product not found');
  });
});
