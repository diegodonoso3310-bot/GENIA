import { CompanyMembershipRole, type Company, type Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import type { CreateCompanyInput } from './company.types.js';

export class CompanyService {
  async createCompany(
    input: CreateCompanyInput,
    tx: Prisma.TransactionClient | typeof prisma = prisma,
  ): Promise<Company> {
    const ownerRole = input.ownerRole ?? CompanyMembershipRole.OWNER;

    return tx.company.create({
      data: {
        name: input.name,
        slug: input.slug,
        memberships: {
          create: {
            userId: input.ownerUserId,
            role: ownerRole,
          },
        },
      },
    });
  }

  async getCompaniesForUser(userId: string) {
    return prisma.companyMembership.findMany({
      where: { userId },
      include: { company: true },
      orderBy: { createdAt: 'asc' },
    });
  }
}
