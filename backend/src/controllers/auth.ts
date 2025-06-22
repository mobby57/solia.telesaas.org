import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const SALT_ROUNDS = 10;

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password, role, tenantId } = request.body as any;

    if (!email || !password || !role || !tenantId) {
      return reply.status(400).send({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(409).send({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Adapted to Prisma schema: roles is a relation, tenantId is not on User model
    // So we create user without role and tenantId, then create UserRole relation separately if needed
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        tenantId: tenantId, // Add tenantId from request body or context
      },
    });

    // If role and tenantId management needed, add here (e.g., create UserRole, or store tenantId elsewhere)

    return reply.status(201).send({ id: user.id, email: user.email /* role and tenantId removed */ });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as any;

    if (!email || !password) {
      return reply.status(400).send({ error: 'Missing email or password' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    // Since user.role and user.tenantId do not exist, adjust token payload accordingly
    const token = jwt.sign(
      {
        userId: user.id,
        // role and tenantId removed or fetched differently if needed
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return reply.send({ token });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = (request as any).user?.userId;
    if (!userId) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true /* role and tenantId removed */ },
    });

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    return reply.send(user);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}


export async function logout(request: FastifyRequest, reply: FastifyReply) {
  // For JWT, logout is usually handled client-side by discarding the token.
  // Optionally, implement token blacklist here.
  return reply.send({ message: 'Logout successful' });
}
