import jwt from 'jsonwebtoken';

export function generateExpiredToken(payload: object = { sub: 'testUserId' }) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: -60, // 1 minute in the past
    issuer: 'solia',
    audience: 'solia-app',
  });
}
