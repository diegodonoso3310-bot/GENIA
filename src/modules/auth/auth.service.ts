import { add } from 'date-fns';
import { AuthSessionStatus, type CompanyMembershipRole } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { verifyPassword } from '../../lib/password.js';
import { createTokenId, signAccessToken } from '../../lib/tokens.js';
import { CompanyService } from '../companies/company.service.js';
import { UserService } from '../users/user.service.js';
import type { LoginInput, RegisterWithCompanyInput } from './auth.types.js';

const companyService = new CompanyService();
const userService = new UserService();

export class AuthService {
  async registerWithCompany(
    input: RegisterWithCompanyInput,
    ownerRole?: CompanyMembershipRole,
  ) {
    return prisma.$transaction(async (tx) => {
      const user = await userService.createUser(
        {
          email: input.email,
          fullName: input.fullName,
          password: input.password,
        },
        tx,
      );

      const company = await companyService.createCompany(
        {
          name: input.companyName,
          slug: input.companySlug,
          ownerUserId: user.id,
          ownerRole,
        },
        tx,
      );

      return { user, company };
    });
  }

  async login(input: LoginInput) {
    const user = await userService.findByEmail(input.email);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isValidPassword = await verifyPassword(input.password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid email or password.');
    }

    const membership = await prisma.companyMembership.findFirst({
      where: {
        userId: user.id,
        company: {
          slug: input.companySlug,
        },
      },
      include: { company: true },
    });

    if (!membership) {
      throw new Error('User does not belong to the requested company.');
    }

    const expiresAt = add(new Date(), { minutes: 15 });
    const tokenId = createTokenId();

    const session = await prisma.authSession.create({
      data: {
        tokenId,
        userId: user.id,
        companyId: membership.companyId,
        expiresAt,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      sessionId: session.id,
      companyId: membership.companyId,
    });

    return {
      accessToken,
      session,
      company: membership.company,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: membership.role,
      },
    };
  }

  async revokeSession(sessionId: string) {
    return prisma.authSession.update({
      where: { id: sessionId },
      data: {
        status: AuthSessionStatus.REVOKED,
        revokedAt: new Date(),
      },
    });
  }
}
