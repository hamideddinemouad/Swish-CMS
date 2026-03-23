type Env = {
  API: string;
  NODE_ENV: string;
  AUTH_ACCESS_SECRET_KEY: string;
  AUTH_REFRESH_SECRET_KEY: string;
  AUTH_ACCESS_TOKEN_EXPIRES_IN: number;
  AUTH_REFRESH_TOKEN_EXPIRES_IN: number;
};

const errors: string[] = [];
const DURATION_UNITS_IN_SECONDS = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
  w: 60 * 60 * 24 * 7,
} as const;

function readRequiredString(name: keyof Env): string {
  const value = process.env[name];

  if (typeof value !== "string") {
    errors.push(`${name}: expected string, received undefined`);
    return "";
  }

  if (value.length === 0) {
    errors.push(`${name}: String must contain at least 1 character(s)`);
  }

  return value;
}

function readRequiredDurationInSeconds(
  name: "AUTH_ACCESS_TOKEN_EXPIRES_IN" | "AUTH_REFRESH_TOKEN_EXPIRES_IN"
): number {
  const value = readRequiredString(name);

  if (value.length === 0) {
    return 0;
  }

  const match = value.match(/^(\d+)([smhdw])$/);

  if (!match) {
    errors.push(`${name}: expected duration like "15m" or "1d"`);
    return 0;
  }

  const amount = Number(match[1]);
  const unit = match[2] as keyof typeof DURATION_UNITS_IN_SECONDS;

  return amount * DURATION_UNITS_IN_SECONDS[unit];
}

export const env: Env = {
  API: readRequiredString("API"),
  NODE_ENV: readRequiredString("NODE_ENV"),
  AUTH_ACCESS_SECRET_KEY: readRequiredString("AUTH_ACCESS_SECRET_KEY"),
  AUTH_REFRESH_SECRET_KEY: readRequiredString("AUTH_REFRESH_SECRET_KEY"),
  AUTH_ACCESS_TOKEN_EXPIRES_IN: readRequiredDurationInSeconds(
    "AUTH_ACCESS_TOKEN_EXPIRES_IN"
  ),
  AUTH_REFRESH_TOKEN_EXPIRES_IN: readRequiredDurationInSeconds(
    "AUTH_REFRESH_TOKEN_EXPIRES_IN"
  ),
};

if (errors.length > 0) {
  throw new Error(`Invalid environment variables:\n${errors.join("\n")}`);
}
