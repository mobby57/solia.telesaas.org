import User from '../user/model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (request: any, reply: any) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '1d' }
  );

  return token;
};

export const registerUser = async (request: any, reply: any) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, role: 'user' },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '1d' }
  );

  return token;
};
