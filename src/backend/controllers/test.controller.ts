import { TestService } from '../services/test.service';
import { TestRepository } from '../repositories/test.repository';

export class TestController {
  static async listTests() {
    try {
      const tests = await TestRepository.findPublished();
      return { success: true, data: tests };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async getTestDetails(slug: string) {
    try {
      const test = await TestRepository.findBySlug(slug);
      if (!test) return { success: false, error: 'Test not found' };
      return { success: true, data: test };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async submitTest(mockTestId: string, userId: string, answers: Record<string, string>, timeTakenSeconds: number) {
    try {
      const result = await TestService.evaluateAttempt(mockTestId, userId, answers, timeTakenSeconds);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
