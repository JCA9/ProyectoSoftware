import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { progresoUsuarios, lecciones, mundos } from '../../../lib/schema';
import { eq, count, and } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    // Progreso total
    const totalLecciones = await db.select({ total: count() }).from(lecciones);
    const totalCompletadas = await db
      .select({ total: count() })
      .from(progresoUsuarios)
      .where(eq(progresoUsuarios.idUsuario, usuarioId));

    const porcentajeTotal = totalLecciones[0].total > 0
      ? Math.round((totalCompletadas[0].total / totalLecciones[0].total) * 100)
      : 0;

    // Progreso por mundo
    const mundosList = await db.select().from(mundos);
    const progresoPorMundo: Record<string, number> = {};

    for (const mundo of mundosList) {
      const totalLeccionesMundo = await db
        .select({ total: count() })
        .from(lecciones)
        .where(eq(lecciones.idMundo, mundo.id));

      const completadasMundo = await db
        .select({ total: count() })
        .from(progresoUsuarios)
        .innerJoin(lecciones, eq(progresoUsuarios.idLeccion, lecciones.id))
        .where(and(
          eq(progresoUsuarios.idUsuario, usuarioId),
          eq(lecciones.idMundo, mundo.id)
        ));

      const porcentajeMundo = totalLeccionesMundo[0].total > 0
        ? Math.round((completadasMundo[0].total / totalLeccionesMundo[0].total) * 100)
        : 0;

      progresoPorMundo[mundo.nombre] = porcentajeMundo;
    }

    return NextResponse.json({
      total: porcentajeTotal,
      mundos: progresoPorMundo
    });

  } catch (error) {
    console.error('Error al calcular progreso global:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
