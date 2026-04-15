import dotenv from 'dotenv';

dotenv.config();

type Env = {
  PORT: number;
  DATABASE_URL?: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_SSL: boolean;
  AUTH_ACCESS_SECRET_KEY: string;
  AUTH_REFRESH_SECRET_KEY: string;
  AUTH_ACCESS_TOKEN_EXPIRES_IN: string;
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
};

const errors: string[] = [];

function readRequiredString(name: keyof Env): string {
  const value = process.env[name];

  if (typeof value !== 'string') {
    errors.push(`${name}: expected string, received undefined`);
    return '';
  }

  if (value.length === 0) {
    errors.push(`${name}: String must contain at least 1 character(s)`);
  }

  return value;
}

function readOptionalString(name: keyof Env): string | undefined {
  const value = process.env[name];

  if (value === undefined || value.length === 0) {
    return undefined;
  }

  return value;
}

function readRequiredTokenDuration(
  name: 'AUTH_ACCESS_TOKEN_EXPIRES_IN' | 'AUTH_REFRESH_TOKEN_EXPIRES_IN',
): string {
  const value = readRequiredString(name);

  if (!/^\d+[smhd]$/.test(value)) {
    errors.push(
      `${name}: expected duration in the format <number><unit> (supported units: s, m, h, d)`,
    );
  }

  return value;
}

function readPositiveInt(name: keyof Env, defaultValue: number): number {
  const rawValue = process.env[name];

  if (rawValue === undefined) {
    errors.push(`${name}: expected number, received undefined`);
    return defaultValue;
  }

  const value = Number(rawValue);

  if (!Number.isInteger(value)) {
    errors.push(`${name}: expected integer, received ${Number.isNaN(value) ? 'nan' : 'float'}`);
    return defaultValue;
  }

  if (value <= 0) {
    errors.push(`${name}: Number must be greater than 0`);
  }

  return value;
}

function readBoolean(name: keyof Env, defaultValue: boolean): boolean {
  const rawValue = process.env[name];

  if (rawValue === undefined) {
    return defaultValue;
  }

  return rawValue === 'true';
}

export const env: Env = {
  PORT: readPositiveInt('PORT', 0),
  DATABASE_URL: readOptionalString('DATABASE_URL'),
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: readPositiveInt('POSTGRES_PORT', 0),
  POSTGRES_USER: readRequiredString('POSTGRES_USER'),
  POSTGRES_PASSWORD: readRequiredString('POSTGRES_PASSWORD'),
  POSTGRES_DB: readRequiredString('POSTGRES_DB'),
  POSTGRES_SSL: readBoolean('POSTGRES_SSL', false),
  AUTH_ACCESS_SECRET_KEY: readRequiredString('AUTH_ACCESS_SECRET_KEY'),
  AUTH_REFRESH_SECRET_KEY: readRequiredString('AUTH_REFRESH_SECRET_KEY'),
  AUTH_ACCESS_TOKEN_EXPIRES_IN: readRequiredTokenDuration(
    'AUTH_ACCESS_TOKEN_EXPIRES_IN',
  ),
  AUTH_REFRESH_TOKEN_EXPIRES_IN: readRequiredTokenDuration(
    'AUTH_REFRESH_TOKEN_EXPIRES_IN',
  ),
};

if (errors.length > 0) {
  throw new Error(`Invalid environment variables:\n${errors.join('\n')}`);
}
