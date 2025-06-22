import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { posts,usuarios } from '../../lib/schema';
import { eq, desc } from 'drizzle-orm';

interface PostPayload {
  idUsuario: number;
  contenido: string;
}

export async function POST(request: Request) {
  try {
    const data: PostPayload = await request.json();

    if (!data.idUsuario || !data.contenido) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    await db.insert(posts).values({
      idUsuario: data.idUsuario,
      contenido: data.contenido,
      fechaCreacion: new Date(),
    });

    return NextResponse.json({ message: 'Post creado correctamente' });
  } catch (error) {
    console.error('Error al crear post:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// GET: Listado de posts
export async function GET() {
  try {
    const result = await db
      .select({
        id: posts.id,
        contenido: posts.contenido,
        fechaCreacion: posts.fechaCreacion,
        usuarioId: usuarios.id,
        nombreUsuario: usuarios.nombre,
        avatar: usuarios.avatarUrl
      })
      .from(posts)
      .innerJoin(usuarios, eq(posts.idUsuario, usuarios.id))
      .orderBy(desc(posts.fechaCreacion));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    return NextResponse.json({ error: 'Error interno al obtener posts' }, { status: 500 });
  }
}
