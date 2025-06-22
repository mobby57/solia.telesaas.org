import { prisma } from '../prismaClient';

export async function purgeExpiredApiKeys() {
  const now = new Date();
  // Use raw MongoDB query via prisma.$runCommandRaw to delete expired and inactive keys
  const result = await prisma.$runCommandRaw({
    delete: 'ApiKey',
    deletes: [
      {
        q: { active: false, expiresAt: { $lt: now } },
        limit: 0,
      },
    ],
  });
  console.log(`Purged expired and inactive API keys:`, result);
}
