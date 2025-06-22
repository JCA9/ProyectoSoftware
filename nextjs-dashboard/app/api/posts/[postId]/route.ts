import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { posts, respuestasPost, usuarios } from '../../../lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const postId = parseInt(params.postId);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'ID de post inválido' }, { status: 400 });
  }

  try {
    // Obtener el post principal
    const post = await db
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
      .where(eq(posts.id, postId));

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    // Obtener las respuestas asociadas
    const respuestas = await db
      .select({
        id: respuestasPost.id,
        contenido: respuestasPost.contenido,
        fechaRespuesta: respuestasPost.fechaRespuesta,
        usuarioId: usuarios.id,
        nombreUsuario: usuarios.nombre,
        avatar: usuarios.avatarUrl
      })
      .from(respuestasPost)
      .innerJoin(usuarios, eq(respuestasPost.idUsuario, usuarios.id))
      .where(eq(respuestasPost.idPost, postId))
      .orderBy(desc(respuestasPost.fechaRespuesta));

    return NextResponse.json({
      post: post[0],
      respuestas
    });
  } catch (error) {
    console.error('Error al obtener hilo:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
