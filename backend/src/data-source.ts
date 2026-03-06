import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env';
export default new DataSource({
    type: 'postgres',
    port: env.POSTGRES_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
