import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetAccessPayload } from './decorators/access.payload.decorator';
import { SetRefreshPayload } from './decorators/refresh.payload.decorator';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
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
  @SetMetadata('routeName', 'register')
  @UseInterceptors(CookieInterceptor)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @SetMetadata('routeName', 'login')
  @UseInterceptors(CookieInterceptor)
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
  @UseInterceptors(CookieInterceptor)
  @SetMetadata('routeName', 'refresh')
  async refresh(@SetRefreshPayload() payload: RefreshPayload) {
    // console.log(payload);
    return this.authService.refresh(payload);
  }

  @Post('logout')
  @SetMetadata('routeName', 'logout')
  @UseInterceptors(CookieInterceptor)
  logout() {
    return {
      message: 'Logged out successfully',
    };
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
