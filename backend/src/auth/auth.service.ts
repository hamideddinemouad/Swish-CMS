import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { env } from '../config/env';
import { User } from '../users/entities/user.entity';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from './constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

type TokenType = 'access' | 'refresh';
type TokenExpiresIn =
  | typeof ACCESS_TOKEN_EXPIRES_IN
  | typeof REFRESH_TOKEN_EXPIRES_IN;

type JwtPayload = {
  sub: string;
  email: string;
  type: TokenType;
};

type AuthUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthTokens> {
    const email = this.normalizeEmail(registerDto.email);
    const emailAlreadyUsed = await this.usersRepository.exists({
      where: { email },
    });

    if (emailAlreadyUsed) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({
      firstName: registerDto.firstName.trim(),
      lastName: registerDto.lastName.trim(),
      email,
      passwordHash: await bcrypt.hash(registerDto.password, 10),
    });
    const savedUser = await this.usersRepository.save(user);

    return this.buildAuthTokens(savedUser);
  }

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const email = this.normalizeEmail(loginDto.email);
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthTokens(user);
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.buildAuthTokens(user);
  }

  private async buildAuthTokens(user: User): Promise<AuthTokens> {
    const safeUser = this.toAuthUser(user);
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(safeUser, 'access', ACCESS_TOKEN_EXPIRES_IN),
      this.signToken(safeUser, 'refresh', REFRESH_TOKEN_EXPIRES_IN),
    ]);

    return {
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }

  private async signToken(
    user: AuthUser,
    type: TokenType,
    expiresIn: TokenExpiresIn,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        type,
      },
      {
        secret: env.AUTH_SECRET_KEY,
        expiresIn,
      },
    );
  }

  private async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: env.AUTH_SECRET_KEY,
      });

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
