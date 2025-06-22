import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { amigos } from '../../../lib/schema';
import { eq, and } from 'drizzle-orm';

interface ActualizarPayload {
    idUsuarioSolicitante: number;
    idUsuarioReceptor: number;
    nuevoEstado: 'aceptado' | 'rechazado';
}

export async function POST(request: Request) {
    try {
        const data: ActualizarPayload = await request.json();

        if (!data.idUsuarioSolicitante || !data.idUsuarioReceptor || !data.nuevoEstado) {
            return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
        }

        const id1 = Math.min(data.idUsuarioSolicitante, data.idUsuarioReceptor);
        const id2 = Math.max(data.idUsuarioSolicitante, data.idUsuarioReceptor);

        const existente = await db
            .select()
            .from(amigos)
            .where(and(eq(amigos.idUsuario1, id1), eq(amigos.idUsuario2, id2)));

        if (existente.length === 0) {
            return NextResponse.json({ error: 'No existe la solicitud de amistad' }, { status: 404 });
        }

        // Si existe, actualizamos:
        await db
            .update(amigos)
            .set({ estado: data.nuevoEstado })
            .where(and(eq(amigos.idUsuario1, id1), eq(amigos.idUsuario2, id2)));

        return NextResponse.json({ message: `Solicitud ${data.nuevoEstado}` });

    } catch (error) {
        console.error('Error al actualizar solicitud de amistad:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
