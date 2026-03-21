import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordWithSecretPhraseDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  secretPhrase: string;

  @IsString()
  @MinLength(4)
  newPassword: string;
}
