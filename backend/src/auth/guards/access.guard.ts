import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { env } from '../../config/env';
import { AccessPayload, RequestWithAccessPayload } from '../decorators/access.payload.decorator';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest<RequestWithAccessPayload>();
    const token = this.extractAccessToken(request);
    const payload = await this.verifyAccessToken(token);
    request.accessPayload = payload;

    return true;
  }

  private extractAccessToken(request: Request): string {
    const token = request.cookies?.[ACCESS_TOKEN_COOKIE_NAME];
    console.log("bounced by access");
    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    return token;
  }

  private async verifyAccessToken(token: string): Promise<AccessPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AccessPayload>(token, {
        secret: env.AUTH_ACCESS_SECRET_KEY,
      });

      if (payload.type !== 'access') {
        console.log("bounced by access");
        throw new UnauthorizedException('Invalid access token');
      }
      console.log("access guard payload", payload)
      return payload;
    } catch {
      console.log("bounced by access");
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
