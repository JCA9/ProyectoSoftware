import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { lecciones } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const mundoId = parseInt(id);

  if (isNaN(mundoId)) {
    return NextResponse.json({ error: 'ID inválido de mundo' }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(lecciones)
      .where(eq(lecciones.idMundo, mundoId))
      .orderBy(lecciones.orden);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener lecciones:", error);
    return NextResponse.json({ error: 'Error al obtener lecciones' }, { status: 500 });
  }
}
