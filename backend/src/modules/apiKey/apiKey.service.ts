import crypto from 'crypto';
import { prisma } from '../../prismaClient';

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
    expiresAt: ttlDays ? new Date(Date.now() + ttlDays * 86400000) : null,
  };
  const apiKey = await prisma.apiKey.create({ data: keyData });
  return apiKey;
}

export async function listApiKeys({
  tenantId,
  limit = 10,
  offset = 0,
}: {
  tenantId: string;
  limit?: number;
  offset?: number;
}) {
  const keys = await prisma.apiKey.findMany({
    where: { tenantId },
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return keys;
}

export async function getApiKey(id: string) {
  return prisma.apiKey.findUnique({
    where: { id },
  });
}

export async function revokeApiKey(id: string) {
  return prisma.apiKey.update({
    where: { id },
    data: { active: false },
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
    },
  });
}
