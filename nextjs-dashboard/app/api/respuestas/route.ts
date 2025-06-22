import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { respuestasPost } from '../../lib/schema';

interface RespuestaPayload {
  idUsuario: number;
  idPost: number;
  contenido: string;
}

export async function POST(request: Request) {
  try {
    const data: RespuestaPayload = await request.json();

    if (!data.idUsuario || !data.idPost || !data.contenido) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    await db.insert(respuestasPost).values({
      idUsuario: data.idUsuario,
      idPost: data.idPost,
      contenido: data.contenido,
      fechaRespuesta: new Date(),
    });

    return NextResponse.json({ message: 'Respuesta registrada correctamente' });
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
