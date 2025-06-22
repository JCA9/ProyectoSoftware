import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { amigos } from '../../../lib/schema';
import { eq, and } from 'drizzle-orm';

interface SolicitudPayload {
  idUsuarioSolicitante: number;
  idUsuarioReceptor: number;
}

export async function POST(request: Request) {
  try {
    const data: SolicitudPayload = await request.json();

    if (!data.idUsuarioSolicitante || !data.idUsuarioReceptor) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    if (data.idUsuarioSolicitante === data.idUsuarioReceptor) {
      return NextResponse.json({ error: 'No puedes enviarte solicitud a ti mismo' }, { status: 400 });
    }

    // Siempre ordenamos los IDs para evitar duplicados cruzados
    const id1 = Math.min(data.idUsuarioSolicitante, data.idUsuarioReceptor);
    const id2 = Math.max(data.idUsuarioSolicitante, data.idUsuarioReceptor);

    const existente = await db
      .select()
      .from(amigos)
      .where(and(eq(amigos.idUsuario1, id1), eq(amigos.idUsuario2, id2)));

    if (existente.length > 0) {
      return NextResponse.json({ message: 'Ya existe una relación de amistad o solicitud' });
    }

    await db.insert(amigos).values({
      idUsuario1: id1,
      idUsuario2: id2,
      estado: 'pendiente',
      fechaSolicitud: new Date(),
    });

    return NextResponse.json({ message: 'Solicitud de amistad enviada' });
  } catch (error) {
    console.error('Error al enviar solicitud de amistad:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
