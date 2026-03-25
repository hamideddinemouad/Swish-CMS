import { jwtVerify, type JWTPayload } from 'jose';
import { env } from '@/lib/env';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(env.AUTH_ACCESS_SECRET_KEY);

type AccessTokenPayload = JWTPayload & {
  type?: string;
};

export async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify<AccessTokenPayload>(
      token,
      ACCESS_TOKEN_SECRET,
      {
        algorithms: ['HS256'],
      },
    );

    return payload.type === 'access';
  } catch {
    return false;
  }
}
