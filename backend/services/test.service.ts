import prisma from '../config/db';
import { TestResultReport } from '@/types/tests';

export class TestService {
  static async getMockTests() {
    return prisma.mockTest.findMany({
      where: { isPublished: true },
      include: { exam: true },
      orderBy: { attemptsCount: 'desc' },
    });
  }

  static async getMockTestBySlug(slug: string) {
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

  static async evaluateAttempt(
    mockTestId: string,
    userId: string,
    answers: Record<string, string>,
    timeTakenSeconds: number
  ): Promise<TestResultReport> {
    const test = await prisma.mockTest.findUnique({
      where: { id: mockTestId },
      include: {
        questions: {
          include: { question: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!test) throw new Error('Mock test not found');

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const evaluatedQuestions = test.questions.map(({ question }) => {
      const userAnswer = answers[question.id] || null;
      let isCorrect = false;
      let marksObtained = 0;

      if (!userAnswer) {
        skippedCount++;
      } else if (userAnswer.toUpperCase() === (question.correctAnswer || '').toUpperCase()) {
        isCorrect = true;
        correctCount++;
        marksObtained = question.marks;
        totalScore += question.marks;
      } else {
        incorrectCount++;
        marksObtained = -question.negativeMarks;
        totalScore -= question.negativeMarks;
      }

      return {
        id: question.id,
        questionText: question.questionText,
        questionTextHi: question.questionTextHi,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        userAnswer,
        correctAnswer: question.correctAnswer || '',
        explanation: question.explanation,
        isCorrect,
        marksObtained,
      };
    });

    const finalScore = Math.max(0, Math.round(totalScore * 100) / 100);
    const percentage = Math.round((finalScore / test.totalMarks) * 1000) / 10;
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 1000) / 10 : 0;

    const attempt = await prisma.testAttempt.create({
      data: {
        userId,
        mockTestId,
        score: finalScore,
        totalMarks: test.totalMarks,
        percentage,
        correctCount,
        incorrectCount,
        skippedCount,
        accuracy,
        timeTakenSeconds,
        answersJson: JSON.stringify(answers),
      },
    });

    await prisma.mockTest.update({
      where: { id: mockTestId },
      data: { attemptsCount: { increment: 1 } },
    });

    return {
      attemptId: attempt.id,
      score: finalScore,
      totalMarks: test.totalMarks,
      percentage,
      accuracy,
      timeTakenSeconds,
      correctCount,
      incorrectCount,
      skippedCount,
      questions: evaluatedQuestions,
    };
  }
}
