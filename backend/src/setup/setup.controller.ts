import { Controller, Get } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Get()
  getSetup() {
    return this.setupService.getSetup();
  }
}
