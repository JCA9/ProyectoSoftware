import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { posts, amigos, usuarios } from '../../../lib/schema';
import { eq, or, and, not, desc, inArray } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    // 1️⃣ Obtener IDs de amigos aceptados
    const relaciones = await db
      .select({
        idUsuario1: amigos.idUsuario1,
        idUsuario2: amigos.idUsuario2
      })
      .from(amigos)
      .where(
        and(
          or(
            eq(amigos.idUsuario1, usuarioId),
            eq(amigos.idUsuario2, usuarioId)
          ),
          eq(amigos.estado, 'aceptado')
        )
      );

    const amigosIds = relaciones.flatMap(rel => {
      if (rel.idUsuario1 === usuarioId) return rel.idUsuario2;
      if (rel.idUsuario2 === usuarioId) return rel.idUsuario1;
      return [];
    });

    // 2️⃣ Agregamos el propio usuario para incluir sus propios posts
    amigosIds.push(usuarioId);

    // 3️⃣ Traemos los posts de amigos + uno mismo
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
      .where(inArray(posts.idUsuario, amigosIds))
      .orderBy(desc(posts.fechaCreacion));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener feed privado:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
