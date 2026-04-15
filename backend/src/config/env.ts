import dotenv from 'dotenv';

dotenv.config();

type Env = {
  PORT?: number;
  DATABASE_URL?: string;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: number;
  POSTGRES_USER?: string;
  POSTGRES_PASSWORD?: string;
  POSTGRES_DB?: string;
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

function readOptionalStringFromNames(names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];

    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }

  return undefined;
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

function readOptionalPositiveIntFromNames(names: string[]): number | undefined {
  for (const name of names) {
    const rawValue = process.env[name];

    if (rawValue === undefined || rawValue.length === 0) {
      continue;
    }

    const value = Number(rawValue);

    if (!Number.isInteger(value)) {
      errors.push(`${name}: expected integer, received ${Number.isNaN(value) ? 'nan' : 'float'}`);
      return undefined;
    }

    if (value <= 0) {
      errors.push(`${name}: Number must be greater than 0`);
      return undefined;
    }

    return value;
  }

  return undefined;
}

function readBoolean(name: keyof Env, defaultValue: boolean): boolean {
  const rawValue = process.env[name];

  if (rawValue === undefined) {
    return defaultValue;
  }

  return rawValue === 'true';
}

const databaseUrl = readOptionalString('DATABASE_URL')
  ?? readOptionalStringFromNames(['POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'DATABASE_URL_UNPOOLED']);

const postgresHost = readOptionalString('POSTGRES_HOST')
  ?? readOptionalStringFromNames(['PGHOST', 'PGHOST_UNPOOLED']);

const postgresPort = readOptionalPositiveIntFromNames(['POSTGRES_PORT', 'PGPORT'])
  ?? (databaseUrl ? undefined : 5432);

const postgresUser = readOptionalString('POSTGRES_USER')
  ?? readOptionalStringFromNames(['PGUSER']);

const postgresPassword = readOptionalString('POSTGRES_PASSWORD')
  ?? readOptionalStringFromNames(['PGPASSWORD']);

const postgresDb = readOptionalString('POSTGRES_DB')
  ?? readOptionalStringFromNames(['POSTGRES_DATABASE', 'PGDATABASE']);

if (!databaseUrl) {
  if (!postgresHost) {
    errors.push('POSTGRES_HOST: expected string, received undefined');
  }

  if (postgresPort === undefined) {
    errors.push('POSTGRES_PORT: expected number, received undefined');
  }

  if (!postgresUser) {
    errors.push('POSTGRES_USER: expected string, received undefined');
  }

  if (!postgresPassword) {
    errors.push('POSTGRES_PASSWORD: expected string, received undefined');
  }

  if (!postgresDb) {
    errors.push('POSTGRES_DB: expected string, received undefined');
  }
}

export const env: Env = {
  PORT: readOptionalPositiveIntFromNames(['PORT']),
  DATABASE_URL: databaseUrl,
  POSTGRES_HOST: postgresHost,
  POSTGRES_PORT: postgresPort,
  POSTGRES_USER: postgresUser,
  POSTGRES_PASSWORD: postgresPassword,
  POSTGRES_DB: postgresDb,
  POSTGRES_SSL: readBoolean('POSTGRES_SSL', Boolean(databaseUrl)),
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
