import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env';
export default new DataSource({
    type: 'postgres',
    ...(env.DATABASE_URL
        ? {
            url: env.DATABASE_URL,
          }
        : {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            username: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
            database: env.POSTGRES_DB,
          }),
    ...(env.POSTGRES_SSL
        ? {
            ssl: {
                rejectUnauthorized: false,
            },
          }
        : {}),
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
