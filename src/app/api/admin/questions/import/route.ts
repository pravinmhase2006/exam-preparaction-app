import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { questions } = await req.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'No questions provided' }, { status: 400 });
    }

    let createdCount = 0;

    for (const q of questions) {
      if (!q.questionText || !q.optionA || !q.optionB || !q.correctAnswer) continue;

      await prisma.question.create({
        data: {
          topic: q.topic || 'General Topic',
          questionText: q.questionText,
          questionTextHi: q.questionTextHi || null,
          questionType: 'MCQ',
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC || '',
          optionD: q.optionD || '',
          correctAnswer: q.correctAnswer.toUpperCase().trim(),
          explanation: q.explanation || null,
          difficulty: q.difficulty || 'MEDIUM',
          marks: parseFloat(q.marks) || 2.0,
          negativeMarks: parseFloat(q.negativeMarks) || 0.5,
          language: q.language || 'Bilingual',
        },
      });
      createdCount++;
    }

    return NextResponse.json({
      success: true,
      importedCount: createdCount,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Failed to bulk import questions' }, { status: 500 });
  }
}
