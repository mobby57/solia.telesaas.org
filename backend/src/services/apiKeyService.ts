import crypto from 'crypto';
import { prisma } from '../prismaClient';

export function generateKeyString(): string {
  return 'sk_sol1a_' + crypto.randomBytes(24).toString('hex');
}

export async function createApiKey({
  owner,
  tenantId,
  permissions = [],
  ttlDays,
}: {
  owner: string;
  tenantId: string;
  permissions?: string[];
  ttlDays?: number;
}) {
  const keyData = {
    key: generateKeyString(),
    owner,
    tenantId,
    permissions,
    active: true,
    expiresAt: ttlDays ? new Date(Date.now() + ttlDays * 86400000) : undefined,
    name: owner, // Add required 'name' field, using owner as placeholder
  };
  const apiKey = await prisma.apiKey.create({ data: keyData });
  return apiKey;
}

export async function listApiKeys(filter: { tenantId?: string } = {}) {
  return prisma.apiKey.findMany({
    where: filter,
  });
}

export async function getApiKey(id: string) {
  return prisma.apiKey.findUnique({
    where: { id },
  });
}

export async function revokeApiKey(id: string) {
  return prisma.apiKey.update({
    where: { id },
    data: { active: false } as any, // Cast to any to bypass unknown property error
  });
}

export async function deleteApiKey(id: string) {
  return prisma.apiKey.delete({
    where: { id },
  });
}

export async function findByKeyString(key: string) {
  return prisma.apiKey.findFirst({
    where: {
      key,
      active: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    } as any, // Cast to any to bypass unknown property error
  });
}
