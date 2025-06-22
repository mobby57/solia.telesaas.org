import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_ID = 'tenant1'; // Add a constant tenantId for seeding

async function main() {
  console.log('Start seeding ...');

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin', tenantId: TENANT_ID },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: { name: 'User', tenantId: TENANT_ID },
  });

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@solia.com' },
    update: {},
    create: {
      email: 'admin@solia.com',
      password: 'admin123', // For seed only, consider hashing in real app
      tenantId: TENANT_ID,
      roles: {
        create: [{ roleId: adminRole.id }],
      },
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@solia.com' },
    update: {},
    create: {
      email: 'user@solia.com',
      password: 'user123',
      tenantId: TENANT_ID,
      roles: {
        create: [{ roleId: userRole.id }],
      },
    },
  });

  // Create API keys
  await prisma.apiKey.upsert({
    where: { key: 'apikey-admin-123' },
    update: {},
    create: {
      key: 'apikey-admin-123',
      description: 'API key for admin user',
      tenantId: TENANT_ID,
    },
  });

  await prisma.apiKey.upsert({
    where: { key: 'apikey-user-456' },
    update: {},
    create: {
      key: 'apikey-user-456',
      description: 'API key for normal user',
      tenantId: TENANT_ID,
    },
  });

  // Create prospects
  await prisma.prospect.upsert({
    where: { id: 'prospect1' },
    update: {},
    create: {
      id: 'prospect1',
      name: 'Prospect One',
      email: 'prospect1@example.com',
      tenantId: TENANT_ID,
    },
  });

  await prisma.prospect.upsert({
    where: { id: 'prospect2' },
    update: {},
    create: {
      id: 'prospect2',
      name: 'Prospect Two',
      email: 'prospect2@example.com',
      tenantId: TENANT_ID,
    },
  });


  // Create scripts
  await prisma.script.upsert({
    where: { id: 'script1' },
    update: {},
    create: {
      id: 'script1',
      tenantId: TENANT_ID,
      title: 'Welcome Script',
      content: 'Hello, welcome to Solia!',
    },
  });

  await prisma.script.upsert({
    where: { id: 'script2' },
    update: {},
    create: {
      id: 'script2',
      tenantId: TENANT_ID,
      title: 'Follow-up Script',
      content: 'Thank you for your interest, we will contact you soon.',
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
