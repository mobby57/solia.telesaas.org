import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export const config = {
  jwtSecret,
};
