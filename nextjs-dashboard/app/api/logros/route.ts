import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { logrosUsuarios } from '../../lib/schema';
import { eq, and } from 'drizzle-orm';

interface LogroPayload {
  idUsuario: number;
  idLogro: number;
}

export async function POST(request: Request) {
  try {
    const data: LogroPayload = await request.json();

    if (!data.idUsuario || !data.idLogro) {
      return NextResponse.json(
        { error: 'Faltan parámetros obligatorios' },
        { status: 400 }
      );
    }

    // Verificamos si ya tiene el logro
    const existente = await db
      .select()
      .from(logrosUsuarios)
      .where(
        and(
          eq(logrosUsuarios.idUsuario, data.idUsuario),
          eq(logrosUsuarios.idLogro, data.idLogro)
        )
      );

    if (existente.length > 0) {
      // Ya tiene el logro → no insertamos
      return NextResponse.json({ message: 'Logro ya desbloqueado' });
    } else {
      // Insertamos el nuevo logro
      await db.insert(logrosUsuarios).values({
        idUsuario: data.idUsuario,
        idLogro: data.idLogro,
        fechaDesbloqueo: new Date(),
      });

      return NextResponse.json({ message: 'Logro desbloqueado' });
    }
  } catch (error) {
    console.error('Error al registrar logro:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
