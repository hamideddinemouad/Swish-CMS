import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetAccessPayload } from './decorators/access.payload.decorator';
import { SetRefreshPayload } from './decorators/refresh.payload.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordWithSecretPhraseDto } from './dto/reset-password-with-secret-phrase.dto';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';
import type { AccessPayload } from './decorators/access.payload.decorator';
import type { RefreshPayload } from './decorators/refresh.payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(AccessGuard)
  me(@SetAccessPayload() payload: AccessPayload) {
    return this.authService.me(payload);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@SetRefreshPayload() payload: RefreshPayload) {
    return this.authService.refresh(payload);
  }

  @Post('reset-password/secret-phrase')
  resetPasswordWithSecretPhrase(
    @Body()
    resetPasswordWithSecretPhraseDto: ResetPasswordWithSecretPhraseDto,
  ) {
    return this.authService.resetPasswordWithSecretPhrase(
      resetPasswordWithSecretPhraseDto,
    );
  }
}
