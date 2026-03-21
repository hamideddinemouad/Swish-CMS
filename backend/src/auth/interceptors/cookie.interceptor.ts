import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import {
  REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
  REFRESH_TOKEN_COOKIE_NAME,
  refreshTokenCookieOptions,
} from '../constants';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    const routeName = this.reflector.get(
      'routeName',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        switch (routeName) {
          case 'register':
          case 'login':
          case 'refresh': {
            this.setRefreshTokenCookie(response, data.refreshToken);
            const { refreshToken, ...responseBody } = data;
            return responseBody;
          }
          case 'logout':
            this.clearCookie(response);
            return data;
          default:
            throw new Error('CookieInterceptor should not be called here');
        }
      }),
    );
  }

  private setRefreshTokenCookie(response: Response, refreshToken: string): void {
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...refreshTokenCookieOptions,
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
    });
  }

  private clearCookie(response: Response): void {
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME, refreshTokenCookieOptions);
  }
}
