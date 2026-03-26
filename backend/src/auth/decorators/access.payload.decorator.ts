import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export type AccessPayload = {
  sub: string;
  email: string;
  tenantId: string ;
  tenantSubdomain: string;
  type: 'access';
};

export type RequestWithAccessPayload = Request & {
  accessPayload: AccessPayload;
};

export const SetAccessPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithAccessPayload>();
    return request.accessPayload;
  },
);
