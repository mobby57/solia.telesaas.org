import { prisma } from '../../src/prismaClient';
import { faker } from '@faker-js/faker';
export async function createTestUserWithRole(roleName = 'user') {
    const tenantId = faker.string.uuid();
    const role = await prisma.role.create({
        data: {
            name: roleName,
            tenantId,
        },
    });
    const user = await prisma.user.create({
        data: {
            email: faker.internet.email(),
            password: 'Test1234!',
            tenantId: tenantId,
        },
    });
    await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: role.id,
        },
    });
    return user;
}
