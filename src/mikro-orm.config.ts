import { Options } from '@mikro-orm/core';
import { Book } from './domain/entities/Book';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  entities: [Book],
  dbName: process.env.DB_NAME,
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export default config;
