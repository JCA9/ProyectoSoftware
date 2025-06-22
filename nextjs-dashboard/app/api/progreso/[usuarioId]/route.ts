import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { progresoUsuarios, lecciones, mundos } from '../../../lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    // Obtenemos progreso total
    const progreso = await db
      .select({
        idLeccion: progresoUsuarios.idLeccion,
        completado: progresoUsuarios.completado,
        fechaCompletado: progresoUsuarios.fechaCompletado,
        puntuacion: progresoUsuarios.puntuacion,
      })
      .from(progresoUsuarios)
      .where(eq(progresoUsuarios.idUsuario, usuarioId));

    return NextResponse.json(progreso);
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return NextResponse.json({ error: 'Error interno al obtener progreso' }, { status: 500 });
  }
}
