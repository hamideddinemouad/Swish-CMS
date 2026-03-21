import {
  BadRequestException,
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
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from './constants';
import type { AccessPayload } from './decorators/access.payload.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordWithSecretPhraseDto } from './dto/reset-password-with-secret-phrase.dto';
import type { RefreshPayload } from './decorators/refresh.payload.decorator';

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
  ) { }

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
      secretPhraseHash: await bcrypt.hash(
        this.normalizeSecretPhrase(registerDto.secretPhrase),
        10,
      ),
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

  async refresh(payload: RefreshPayload): Promise<AuthTokens> {
    return this.buildAuthTokens(payload);
  }

  me(payload: AccessPayload): AccessPayload {
    return payload;
  }

  async changePassword(
    accessToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
      secret: env.AUTH_SECRET_KEY,
    }).catch(() => {
      throw new UnauthorizedException('Invalid access token');
    });

    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const isSamePassword = await bcrypt.compare(
      changePasswordDto.newPassword,
      user.passwordHash,
    );

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    user.passwordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersRepository.save(user);

    return {
      message: 'Password updated successfully',
    };
  }

  async resetPasswordWithSecretPhrase(
    resetPasswordWithSecretPhraseDto: ResetPasswordWithSecretPhraseDto,
  ): Promise<{ message: string }> {
    const email = this.normalizeEmail(resetPasswordWithSecretPhraseDto.email);
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user || !user.secretPhraseHash) {
      throw new UnauthorizedException('Invalid email or secret phrase');
    }

    const isSecretPhraseValid = this.normalizeSecretPhrase(resetPasswordWithSecretPhraseDto.secretPhrase) === user.secretPhraseHash;

    if (!isSecretPhraseValid) {
      throw new UnauthorizedException('Invalid email or secret phrase');
    }

    const isSamePassword = await bcrypt.compare(
      resetPasswordWithSecretPhraseDto.newPassword,
      user.passwordHash,
    );

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    user.passwordHash = await bcrypt.hash(
      resetPasswordWithSecretPhraseDto.newPassword,
      10,
    );
    await this.usersRepository.save(user);

    return {
      message: 'Password reset successfully',
    };
  }

  private async buildAuthTokens(user: User | AuthUser): Promise<AuthTokens> {
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

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private normalizeSecretPhrase(secretPhrase: string): string {
    return secretPhrase.trim();
  }

  private toAuthUser(user: User | AuthUser): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
