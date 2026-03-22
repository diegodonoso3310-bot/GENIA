import { CompanyMembershipRole } from '@prisma/client';
import { prisma } from '../src/lib/prisma.js';
import { hashPassword } from '../src/lib/password.js';
import { createTokenId } from '../src/lib/tokens.js';

async function main() {
  await prisma.authSession.deleteMany();
  await prisma.companyMembership.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const [alicePassword, bobPassword, chrisPassword] = await Promise.all([
    hashPassword('Password123!'),
    hashPassword('Password123!'),
    hashPassword('Password123!'),
  ]);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@acme.test',
      fullName: 'Alice Owner',
      passwordHash: alicePassword,
      isPlatformAdmin: true,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@acme.test',
      fullName: 'Bob Admin',
      passwordHash: bobPassword,
    },
  });

  const chris = await prisma.user.create({
    data: {
      email: 'chris@globex.test',
      fullName: 'Chris Member',
      passwordHash: chrisPassword,
    },
  });

  const acme = await prisma.company.create({
    data: {
      name: 'Acme Inc.',
      slug: 'acme',
    },
  });

  const globex = await prisma.company.create({
    data: {
      name: 'Globex Corp.',
      slug: 'globex',
    },
  });

  await prisma.companyMembership.createMany({
    data: [
      { userId: alice.id, companyId: acme.id, role: CompanyMembershipRole.OWNER },
      { userId: bob.id, companyId: acme.id, role: CompanyMembershipRole.ADMIN },
      { userId: chris.id, companyId: globex.id, role: CompanyMembershipRole.MEMBER },
      { userId: alice.id, companyId: globex.id, role: CompanyMembershipRole.ADMIN },
    ],
  });

  await prisma.authSession.create({
    data: {
      userId: alice.id,
      companyId: acme.id,
      tokenId: createTokenId(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      ipAddress: '127.0.0.1',
      userAgent: 'seed-script',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
