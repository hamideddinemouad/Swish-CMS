import { Controller } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  setup(tenantId: string) {
    return this.setupService.setup(tenantId);
  }
}
