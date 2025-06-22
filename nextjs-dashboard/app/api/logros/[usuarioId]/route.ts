import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { logros, logrosUsuarios } from '../../../lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
  }

  try {
    const result = await db
      .select({
        id: logros.id,
        titulo: logros.titulo,
        descripcion: logros.descripcion,
        iconoUrl: logros.iconoUrl,
        fechaDesbloqueo: logrosUsuarios.fechaDesbloqueo
      })
      .from(logrosUsuarios)
      .innerJoin(logros, eq(logrosUsuarios.idLogro, logros.id))
      .where(eq(logrosUsuarios.idUsuario, usuarioId))
      .orderBy(logrosUsuarios.fechaDesbloqueo);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener logros:', error);
    return NextResponse.json({ error: 'Error interno al obtener logros' }, { status: 500 });
  }
}
