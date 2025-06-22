import jwt from 'jsonwebtoken';
export function generateExpiredToken(payload = { sub: 'testUserId' }) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: -60, // 1 minute in the past
        issuer: 'solia',
        audience: 'solia-app',
    });
}
