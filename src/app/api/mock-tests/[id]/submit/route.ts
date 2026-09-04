import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const { answers, timeTakenSeconds } = await req.json();

    const mockTest = await prisma.mockTest.findUnique({
      where: { id: params.id },
      include: {
        questions: {
          include: { question: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!mockTest) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    const questions = mockTest.questions.map((q) => q.question);

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const answerReports = questions.map((q) => {
      const userAnsObj = answers[q.id];
      const chosen = userAnsObj?.chosenAnswer || null;
      const isCorrect = chosen === q.correctAnswer;

      if (!chosen) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
        score += q.marks || 2.0;
      } else {
        incorrectCount++;
        score -= q.negativeMarks || 0.5;
      }

      return {
        questionId: q.id,
        questionText: q.questionText,
        questionTextHi: q.questionTextHi,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        userAnswer: chosen,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 2.0), 0);
    const percentage = Math.max(0, Math.round((score / totalMarks) * 1000) / 10);
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 1000) / 10
        : 0;

    const finalScore = Math.max(0, Math.round(score * 100) / 100);

    // If candidate is logged in, save the attempt in DB
    if (user) {
      await prisma.testAttempt.create({
        data: {
          userId: user.id,
          mockTestId: mockTest.id,
          score: finalScore,
          totalMarks,
          percentage,
          correctCount,
          incorrectCount,
          skippedCount,
          accuracy,
          timeTakenSeconds: timeTakenSeconds || 0,
          answersJson: JSON.stringify(answers),
        },
      });
    }

    return NextResponse.json({
      success: true,
      report: {
        score: finalScore,
        totalMarks,
        percentage,
        correctCount,
        incorrectCount,
        skippedCount,
        accuracy,
        timeTakenSeconds: timeTakenSeconds || 0,
        answers: answerReports,
      },
    });
  } catch (error) {
    console.error('Submit mock test error:', error);
    return NextResponse.json({ error: 'Failed to evaluate test' }, { status: 500 });
  }
}
