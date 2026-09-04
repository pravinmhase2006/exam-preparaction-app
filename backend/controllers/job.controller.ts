import { JobRepository } from '../repositories/job.repository';
import { JobFilterParams } from '@/types/jobs';

export class JobController {
  static async listJobs(params: JobFilterParams) {
    try {
      const jobs = await JobRepository.findMany(params);
      return { success: true, data: jobs };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async getFeatured(limit = 6) {
    try {
      const jobs = await JobRepository.findFeatured(limit);
      return { success: true, data: jobs };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async getJobDetails(slug: string) {
    try {
      const job = await JobRepository.findBySlug(slug);
      if (!job) return { success: false, error: 'Job not found' };
      await JobRepository.incrementViews(job.id);
      return { success: true, data: job };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
