export class CreateContentDefinitionDto {
  tenantId: string;
  slug: string;
  name: string;
  schema: Record<string, unknown>;
}
