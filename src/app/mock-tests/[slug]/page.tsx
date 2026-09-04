import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import MockTestEngine from '@/components/tests/MockTestEngine';
import { getCurrentUser } from '@/lib/auth';
import { constructMetadata } from '@/lib/seo';

interface MockTestRunnerPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MockTestRunnerPageProps) {
  const test = await prisma.mockTest.findUnique({
    where: { slug: params.slug },
    include: { exam: true },
  });

  if (!test) return { title: 'Mock Test Not Found | GovtPrep India' };

  return constructMetadata({
    title: `${test.title} - Free Online Live Exam Simulator`,
    description: `Attempt ${test.title} online. Real exam timer, negative marking, bilingual questions and instant detailed performance report.`,
    canonical: `/mock-tests/${test.slug}`,
  });
}

export const revalidate = 0;

export default async function MockTestRunnerPage({ params }: MockTestRunnerPageProps) {
  const user = await getCurrentUser();

  const test = await prisma.mockTest.findUnique({
    where: { slug: params.slug },
    include: {
      exam: true,
      questions: {
        include: {
          question: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!test || !test.isPublished) notFound();

  // Increment attempts counter
  await prisma.mockTest.update({
    where: { id: test.id },
    data: { attemptsCount: { increment: 1 } },
  });

  return (
    <MockTestEngine
      test={test as any}
      userId={user?.id}
    />
  );
}
