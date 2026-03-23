import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '../config/env';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: env.AUTH_ACCESS_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessGuard, RefreshGuard],
})
export class AuthModule {}
