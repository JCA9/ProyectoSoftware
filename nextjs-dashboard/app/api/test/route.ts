import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { mundos } from '../../lib/schema';

export async function GET() {
  const result = await db.select().from(mundos);
  return NextResponse.json(result);
}
