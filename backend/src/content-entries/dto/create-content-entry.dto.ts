export class CreateContentEntryDto {
  tenantId: string;
  definitionId: string;
  slug: string;
  data: Record<string, unknown>;
  isPublished: boolean;
  publishedAt: Date;
}
