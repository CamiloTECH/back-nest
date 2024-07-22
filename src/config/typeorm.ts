import { DataSource, DataSourceOptions } from 'typeorm';
import { config as configDotenv } from 'dotenv';
import { registerAs } from '@nestjs/config';

configDotenv({ path: '.env' });

const config: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  synchronize: false,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
