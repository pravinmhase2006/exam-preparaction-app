import { TechRepository } from '../repositories/tech.repository';

export class TechController {
  static async listTechJobs(params: { q?: string; category?: string; mode?: string; limit?: number }) {
    try {
      const jobs = await TechRepository.findJobs(params);
      return { success: true, data: jobs };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async getTechJob(slug: string) {
    try {
      const job = await TechRepository.findJobBySlug(slug);
      if (!job) return { success: false, error: 'Tech job not found' };
      return { success: true, data: job };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async listCourses(category?: string) {
    try {
      const courses = await TechRepository.findCourses(category);
      return { success: true, data: courses };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async listInternships(params: { category?: string; mode?: string }) {
    try {
      const internships = await TechRepository.findInternships(params);
      return { success: true, data: internships };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
