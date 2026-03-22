import type { Prisma, User } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { hashPassword } from '../../lib/password.js';
import type { CreateUserInput } from './user.types.js';

export class UserService {
  async createUser(
    input: CreateUserInput,
    tx: Prisma.TransactionClient | typeof prisma = prisma,
  ): Promise<User> {
    const passwordHash = await hashPassword(input.password);

    return tx.user.create({
      data: {
        email: input.email.toLowerCase(),
        fullName: input.fullName,
        passwordHash,
        isPlatformAdmin: input.isPlatformAdmin ?? false,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async getCompanyScopedUser(userId: string, companyId: string) {
    return prisma.user.findFirst({
      where: {
        id: userId,
        memberships: {
          some: { companyId },
        },
      },
      include: {
        memberships: {
          where: { companyId },
        },
      },
    });
  }
}
