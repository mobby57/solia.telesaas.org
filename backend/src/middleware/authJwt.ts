import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import User from '../modules/user/model';

export function authJwt(requiredRoles: string[] = []) {
  return async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.code(401).send({ message: 'No token provided' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

      // Fetch full user from DB including roleId
      const user = await User.findById(payload.id).exec();

      if (!user) {
        reply.code(401).send({ message: 'User not found' });
        return;
      }

      // Defensive check for role
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.roleId?.toString())) {
        reply.code(403).send({ message: 'Forbidden' });
        return;
      }

      (request as any).user = user;
      return;
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
      return;
    }
  };
}
