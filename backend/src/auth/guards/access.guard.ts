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
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    return token;
  }

  private async verifyAccessToken(token: string): Promise<AccessPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AccessPayload>(token, {
        secret: env.AUTH_SECRET_KEY,
      });

      if (payload.type !== 'access') {
        throw new UnauthorizedException('Invalid access token');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
