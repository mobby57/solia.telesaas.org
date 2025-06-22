import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export async function createFastify() {
    // Dynamically import buildApp to ensure correct ESM resolution with type assertion
    const mod = (await import('../../src/app.js'));
    const buildApp = mod.buildApp;
    if (typeof buildApp !== 'function') {
        throw new Error('buildApp is not a function. Please check the import in testHelpers.ts');
    }
    const app = await buildApp();
    console.log('createFastify - app.close exists:', typeof app.close === 'function');
    await app.ready();
    return app;
}
export async function createRole(data) {
    const role = await prisma.role.create({
        data: {
            name: data.name,
            tenantId: data.tenantId.toString(),
        },
    });
    return role;
}
export async function createUser(data) {
    const user = await prisma.user.create({
        data: {
            email: 'testuser_' + Math.random().toString(36).substring(2, 15) + '@example.com',
            password: 'password', // In real tests, hash password or mock auth
            tenantId: data.tenantId.toString(),
        },
    });
    return user;
}
export async function createUserRole(data) {
    const userRole = await prisma.userRole.create({
        data: {
            userId: data.userId,
            roleId: data.roleId,
        },
    });
    return userRole;
}
export function generateJwt(user) {
    const secret = process.env.JWT_SECRET || 'changeme';
    const payload = {
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}
