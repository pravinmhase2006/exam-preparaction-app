import prisma from '../config/db';

export class TestRepository {
  static async findPublished() {
    return prisma.mockTest.findMany({
      where: { isPublished: true },
      include: { exam: true },
      orderBy: { attemptsCount: 'desc' },
    });
  }

  static async findBySlug(slug: string) {
    return prisma.mockTest.findUnique({
      where: { slug },
      include: {
        exam: true,
        questions: {
          include: { question: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  static async findById(id: string) {
    return prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          include: { question: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  static async createAttempt(data: any) {
    return prisma.testAttempt.create({ data });
  }

  static async incrementAttempts(id: string) {
    return prisma.mockTest.update({
      where: { id },
      data: { attemptsCount: { increment: 1 } },
    });
  }
}
