import User from './model';

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}
