import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export class AuthController {
  static async login(email: string, passwordPlain: string) {
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) return { success: false, error: 'Invalid credentials' };

      const isValid = await bcrypt.compare(passwordPlain, user.password);
      if (!isValid) return { success: false, error: 'Invalid credentials' };

      const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified || false,
      });

      return {
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async register(name: string, email: string, passwordPlain: string) {
    try {
      const existing = await UserRepository.findByEmail(email);
      if (existing) return { success: false, error: 'Email already registered' };

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
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
