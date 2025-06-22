import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { progresoUsuarios, lecciones, logrosUsuarios, logros } from '../../lib/schema';
import { eq, and, count } from 'drizzle-orm';

// 🎯 Definimos constantes para los IDs de logros
const LOGRO_PRIMER_PASO = 1;
const LOGRO_MUNDO_1_COMPLETADO = 2;
const LOGRO_MUNDO_2_COMPLETADO = 3;
const LOGRO_MUNDO_3_COMPLETADO = 4;
const LOGRO_EXPLORADOR = 5;

interface ProgresoPayload {
  idUsuario: number;
  idLeccion: number;
  puntuacion?: number;
  completado?: boolean;
}

export async function POST(request: Request) {
  try {
    const data: ProgresoPayload = await request.json();

    if (!data.idUsuario || !data.idLeccion) {
      return NextResponse.json({ error: 'Faltan parámetros obligatorios' }, { status: 400 });
    }

    // 1️⃣ Registrar o actualizar progreso
    const existente = await db
      .select()
      .from(progresoUsuarios)
      .where(
        and(
          eq(progresoUsuarios.idUsuario, data.idUsuario),
          eq(progresoUsuarios.idLeccion, data.idLeccion)
        )
      );

    if (existente.length > 0) {
      await db
        .update(progresoUsuarios)
        .set({
          completado: data.completado ?? true,
          puntuacion: data.puntuacion ?? existente[0].puntuacion,
          fechaCompletado: new Date(),
        })
        .where(
          and(
            eq(progresoUsuarios.idUsuario, data.idUsuario),
            eq(progresoUsuarios.idLeccion, data.idLeccion)
          )
        );
    } else {
      await db.insert(progresoUsuarios).values({
        idUsuario: data.idUsuario,
        idLeccion: data.idLeccion,
        completado: data.completado ?? true,
        puntuacion: data.puntuacion ?? 0,
        fechaCompletado: new Date(),
      });
    }

    // 2️⃣ Evaluar desbloqueo de logros

    // ✅ Logro: Primer paso (completar primera lección)
    const totalCompletadas = await db
      .select({ count: count() })
      .from(progresoUsuarios)
      .where(and(eq(progresoUsuarios.idUsuario, data.idUsuario), eq(progresoUsuarios.completado, true)));

    if (totalCompletadas[0].count === 1) {
      await desbloquearLogro(data.idUsuario, LOGRO_PRIMER_PASO);
    }

    // ✅ Logros por mundo
    const leccionActual = await db
      .select({ idMundo: lecciones.idMundo })
      .from(lecciones)
      .where(eq(lecciones.id, data.idLeccion))
      .limit(1);

    if (leccionActual.length > 0) {
      const mundoId = leccionActual[0].idMundo;

      const totalLeccionesMundo = await db
        .select({ count: count() })
        .from(lecciones)
        .where(eq(lecciones.idMundo, mundoId));

      const totalCompletadasEnMundo = await db
        .select({ count: count() })
        .from(progresoUsuarios)
        .innerJoin(lecciones, eq(progresoUsuarios.idLeccion, lecciones.id))
        .where(
          and(
            eq(progresoUsuarios.idUsuario, data.idUsuario),
            eq(progresoUsuarios.completado, true),
            eq(lecciones.idMundo, mundoId)
          )
        );

      if (totalLeccionesMundo[0].count === totalCompletadasEnMundo[0].count) {
        if (mundoId === 1) await desbloquearLogro(data.idUsuario, LOGRO_MUNDO_1_COMPLETADO);
        if (mundoId === 2) await desbloquearLogro(data.idUsuario, LOGRO_MUNDO_2_COMPLETADO);
        if (mundoId === 3) await desbloquearLogro(data.idUsuario, LOGRO_MUNDO_3_COMPLETADO);
      }
    }

    // ✅ Logro final: Explorador (todas las lecciones de todos los mundos)
    const totalLecciones = await db.select({ count: count() }).from(lecciones);

    if (totalCompletadas[0].count === totalLecciones[0].count) {
      await desbloquearLogro(data.idUsuario, LOGRO_EXPLORADOR);
    }

    return NextResponse.json({ message: 'Progreso registrado y logros evaluados' });

  } catch (error) {
    console.error('Error al registrar progreso:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// 🔑 Función auxiliar: desbloquear logro si aún no lo tiene
async function desbloquearLogro(idUsuario: number, idLogro: number) {
  const existe = await db
    .select()
    .from(logrosUsuarios)
    .where(and(eq(logrosUsuarios.idUsuario, idUsuario), eq(logrosUsuarios.idLogro, idLogro)));

  if (existe.length === 0) {
    await db.insert(logrosUsuarios).values({
      idUsuario,
      idLogro,
      fechaDesbloqueo: new Date(),
    });
  }
}
