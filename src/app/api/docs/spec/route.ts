import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger-spec';

export async function GET() {
  return NextResponse.json(swaggerSpec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
