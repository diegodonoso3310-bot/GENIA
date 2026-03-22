import type { CompanyMembershipRole } from '@prisma/client';

export type CreateCompanyInput = {
  name: string;
  slug: string;
  ownerUserId: string;
  ownerRole?: CompanyMembershipRole;
};
