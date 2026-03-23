import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import type { Request } from 'express';
import { Repository } from 'typeorm';
import { env } from '../../config/env';
import { User } from '../../users/entities/user.entity';
import type { RefreshPayload } from '../decorators/refresh.payload.decorator';

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

type JwtPayload = {
  sub: string;
  email: string;
  type: 'access' | 'refresh' | 'password-reset';
};

type RequestWithRefreshPayload = Request & {
  refreshPayload?: RefreshPayload;
};

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithRefreshPayload>();
    const token = this.extractRefreshToken(request);
    const payload = await this.verifyRefreshToken(token);
    const user = await this.findUser(payload);
    request.refreshPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: 'refresh',
    };

    return true;
  }

  private extractRefreshToken(request: Request): string {
    const token = request.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    return token;
  }

  private async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: env.AUTH_REFRESH_SECRET_KEY,
      });

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async findUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub, email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }
}
