import dotenv from 'dotenv';

dotenv.config();

type Env = {
  PORT: number;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
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

export const env: Env = {
  PORT: readPositiveInt('PORT', 0),
  POSTGRES_PORT: readPositiveInt('POSTGRES_PORT', 0),
  POSTGRES_USER: readRequiredString('POSTGRES_USER'),
  POSTGRES_PASSWORD: readRequiredString('POSTGRES_PASSWORD'),
  POSTGRES_DB: readRequiredString('POSTGRES_DB'),
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
