import prisma from '@/lib/db';
import { JobFilterParams } from '@/types/jobs';

export class JobService {
  static async getFeaturedJobs(limit = 6) {
    return prisma.job.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      include: { organization: true, category: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async getJobs(params: JobFilterParams) {
    const where: any = { status: 'PUBLISHED' };

    if (params.q) {
      where.OR = [
        { title: { contains: params.q } },
        { department: { contains: params.q } },
        { location: { contains: params.q } },
        { organization: { name: { contains: params.q } } },
      ];
    }

    if (params.qualification) {
      where.qualification = { contains: params.qualification };
    }

    if (params.category) {
      where.category = { slug: params.category };
    }

    if (params.state) {
      where.state = { name: params.state };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (params.sort === 'urgent') orderBy = { applicationEnd: 'asc' };
    else if (params.sort === 'popular') orderBy = { views: 'desc' };
    else if (params.sort === 'vacancies') orderBy = { vacancies: 'desc' };

    return prisma.job.findMany({
      where,
      include: { organization: true, category: true, state: true },
      orderBy,
      take: params.limit || 20,
    });
  }

  static async getJobBySlug(slug: string) {
    return prisma.job.findUnique({
      where: { slug },
      include: {
        organization: true,
        category: true,
        state: true,
      },
    });
  }
}
