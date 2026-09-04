import prisma from '../config/db';

export class UserRepository {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  static async create(data: { email: string; name: string; passwordHash: string; role?: any }) {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        name: data.name,
        password: data.passwordHash,
        role: data.role || 'CANDIDATE',
        profile: {
          create: {},
        },
      },
      include: { profile: true },
    });
  }
}
