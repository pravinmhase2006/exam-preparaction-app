import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, qualification, state, category } = await req.json();

    const alert = await prisma.jobAlert.create({
      data: {
        userId: user.id,
        name: name || `${qualification || 'All'} Jobs Alert`,
        qualification,
        state,
        category,
      },
    });

    return NextResponse.json({ success: true, alert });
  } catch (error) {
    console.error('Job alert error:', error);
    return NextResponse.json({ error: 'Failed to create job alert' }, { status: 500 });
  }
}
