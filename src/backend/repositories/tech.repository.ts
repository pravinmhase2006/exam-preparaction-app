import prisma from '@/lib/db';

export class TechRepository {
  static async findJobs(params: { q?: string; category?: string; mode?: string; limit?: number }) {
    const where: any = { status: 'PUBLISHED' };
    if (params.q) {
      where.OR = [
        { title: { contains: params.q } },
        { company: { contains: params.q } },
        { techStack: { contains: params.q } },
      ];
    }
    if (params.category) where.roleCategory = params.category;
    if (params.mode) where.workMode = params.mode;

    return prisma.techJob.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: params.limit || 30,
    });
  }

  static async findJobBySlug(slug: string) {
    return prisma.techJob.findUnique({ where: { slug } });
  }

  static async findCourses(category?: string) {
    const where: any = {};
    if (category) where.category = category;
    return prisma.techCourse.findMany({
      where,
      orderBy: { rating: 'desc' },
    });
  }

  static async findCourseBySlug(slug: string) {
    return prisma.techCourse.findUnique({ where: { slug } });
  }

  static async findInternships(params: { category?: string; mode?: string }) {
    const where: any = { status: 'ACTIVE' };
    if (params.category) where.roleCategory = params.category;
    if (params.mode) where.workMode = params.mode;

    return prisma.internship.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async findInternshipBySlug(slug: string) {
    return prisma.internship.findUnique({ where: { slug } });
  }
}
