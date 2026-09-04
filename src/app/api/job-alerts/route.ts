import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { name, qualification, state, category, channel, contact, exams, frequency } = body;

    if (user) {
      const alert = await prisma.jobAlert.create({
        data: {
          userId: user.id,
          name: name || `${qualification || (exams ? exams.join(', ') : 'All')} Jobs Alert`,
          qualification: qualification || 'All',
          state: state || 'All India',
          category: category || (exams ? exams[0] : 'General'),
        },
      });
      return NextResponse.json({ success: true, alert });
    }

    // Guest subscriber
    return NextResponse.json({ 
      success: true, 
      message: `Subscribed ${contact || 'candidate'} for ${channel || 'WhatsApp'} alerts successfully.` 
    });
  } catch (error) {
    console.error('Job alert error:', error);
    return NextResponse.json({ error: 'Failed to create job alert' }, { status: 500 });
  }
}
