import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { progresoUsuarios, lecciones, mundos } from '../../../lib/schema';
import { eq, and, count, sql } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    // Progreso general total
    const totalLecciones = await db.select({ count: count() }).from(lecciones);
    const totalCompletadas = await db
      .select({ count: count() })
      .from(progresoUsuarios)
      .where(
        and(
          eq(progresoUsuarios.idUsuario, usuarioId),
          eq(progresoUsuarios.completado, true)
        )
      );

    const progresoTotal = totalLecciones[0].count > 0
      ? Math.round((totalCompletadas[0].count / totalLecciones[0].count) * 100)
      : 0;

    // Progreso por mundo
    const mundosList = await db.select().from(mundos).orderBy(mundos.orden);

    const progresoPorMundo = await Promise.all(
      mundosList.map(async (mundo) => {
        const totalLeccionesMundo = await db
          .select({ count: count() })
          .from(lecciones)
          .where(eq(lecciones.idMundo, mundo.id));

        const completadasMundo = await db
          .select({ count: count() })
          .from(progresoUsuarios)
          .innerJoin(lecciones, eq(progresoUsuarios.idLeccion, lecciones.id))
          .where(
            and(
              eq(progresoUsuarios.idUsuario, usuarioId),
              eq(progresoUsuarios.completado, true),
              eq(lecciones.idMundo, mundo.id)
            )
          );

        const porcentajeMundo = totalLeccionesMundo[0].count > 0
          ? Math.round((completadasMundo[0].count / totalLeccionesMundo[0].count) * 100)
          : 0;

        return {
          mundoId: mundo.id,
          nombre: mundo.nombre,
          porcentaje: porcentajeMundo,
        };
      })
    );

    return NextResponse.json({
      progresoTotal,
      progresoPorMundo
    });
  } catch (error) {
    console.error('Error al calcular progreso global:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
