import type { Script } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Liste tous les scripts d'un tenant
export async function listScripts(tenantId: string): Promise<Script[]> {
  return prisma.script.findMany({
    where: { tenantId },
  });
}

// ✅ Récupère un script par ID et tenant
export async function getScript(id: string, tenantId: string): Promise<Script | null> {
  return prisma.script.findFirst({
    where: { id, tenantId },
  });
}

// ✅ Crée un nouveau script
export async function createScript(data: Omit<Script, 'id'>): Promise<Script> {
  return prisma.script.create({
    data,
  });
}

// ✅ Met à jour un script existant
export async function updateScript(id: string, tenantId: string, data: Partial<Script>): Promise<Script> {
  const updated = await prisma.script.updateMany({
    where: { id, tenantId },
    data,
  });

  if (updated.count === 0) {
    throw new Error('Script not found or update failed');
  }

  return prisma.script.findFirst({ where: { id, tenantId } }) as Promise<Script>;
}

// ✅ Supprime un script
export async function deleteScript(id: string, tenantId: string): Promise<void> {
  const deleted = await prisma.script.deleteMany({
    where: { id, tenantId },
  });

  if (deleted.count === 0) {
    throw new Error('Script not found or delete failed');
  }
}
