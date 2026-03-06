export class CreateTenantEventDto {
  tenantId: string;
  actorUserId: string | null;
  type: string;
  payload: Record<string, unknown>;
}
