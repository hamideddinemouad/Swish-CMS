export class CreatePageDto {
  tenantId: string;
  slug: string;
  title: string;
  components: Record<string, unknown>;
}
