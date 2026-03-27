import { Injectable } from '@nestjs/common';

@Injectable()
export class SetupService {
  getSetup() {
    return {
      status: 'stub',
      message: 'Setup endpoint is wired and ready for future onboarding logic.',
    };
  }
}
