import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export class AuthService {
  static async validateUser(email: string, passwordPlain: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(passwordPlain, user.password);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  static async registerUser(name: string, email: string, passwordPlain: string) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(passwordPlain, 10);
    const user = await UserRepository.create({ name, email, passwordHash });

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified || false,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  }
}
