import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { mundos } from '../../lib/schema';

export async function GET() {
  try {
    const result = await db.select().from(mundos).orderBy(mundos.orden);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener mundos:", error);
    return NextResponse.json({ error: 'Error al obtener los mundos' }, { status: 500 });
  }
}
