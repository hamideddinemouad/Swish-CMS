import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export type RefreshPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
  type: 'refresh';
};

type RequestWithPayload = Request & {
  refreshPayload: RefreshPayload;
};

export const SetRefreshPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithPayload>();
    return request.refreshPayload;
  },
);
