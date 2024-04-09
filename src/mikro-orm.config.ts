import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { Book } from 'src/domain/entities/Book';

dotenv.config();

const config: Options = {
  entities: [Book],
  dbName: process.env.DB_NAME,
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export default config;
