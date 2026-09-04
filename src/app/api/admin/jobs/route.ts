import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = await req.json();

    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const job = await prisma.job.create({
      data: {
        title: data.title,
        slug,
        organizationId: data.organizationId,
        department: data.department || '',
        categoryId: data.categoryId,
        qualification: data.qualification || 'Graduate',
        vacancies: parseInt(data.vacancies) || 0,
        vacanciesDisplay: data.vacanciesDisplay || `${data.vacancies} Posts`,
        location: data.location || 'All India',
        salary: data.salary || 'As per 7th CPC Matrix',
        minAge: parseInt(data.minAge) || 18,
        maxAge: parseInt(data.maxAge) || 30,
        applicationFee: data.applicationFee || 'Gen/OBC: ₹100, SC/ST: Nil',
        applicationStart: data.applicationStart ? new Date(data.applicationStart) : new Date(),
        applicationEnd: data.applicationEnd ? new Date(data.applicationEnd) : null,
        examDate: data.examDate || '',
        selectionProcess: data.selectionProcess || 'Written Exam -> Document Verification',
        eligibility: data.eligibility || '',
        officialNotificationUrl: data.officialNotificationUrl || '',
        officialWebsiteUrl: data.officialWebsiteUrl || '',
        applyUrl: data.applyUrl || '',
        isFeatured: Boolean(data.isFeatured),
        isUrgent: Boolean(data.isUrgent),
        status: data.status || 'PUBLISHED',
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
