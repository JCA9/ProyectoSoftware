import { db } from "../../../lib/db";
import { amigos, usuarios } from "../../../lib/schema";
import { eq, or, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { usuarioId: string } }) {
  const usuarioId = parseInt(params.usuarioId);

  const sql = `select 
                a.id, 
                a.id_usuario1 as miId, 
                a.id_usuario2 as amigoId,
                a.estado, 
                u.nombre as nombreAmigo,
                un.nombre as nombreMio 
                from amigos a
                INNER JOIN usuarios u ON u.id = a.id_usuario2
                INNER JOIN usuarios un On un.id = a.id_usuario1
                where a.id_usuario1=${usuarioId} or a.id_usuario2=${usuarioId};`;


  const resultados = await db.execute(sql);
  // Primero obtenemos las relaciones
  // const relaciones = await db
  //   .select({
  //     id: amigos.id,
  //     idUsuario1: amigos.idUsuario1,
  //     idUsuario2: amigos.idUsuario2,
  //     estado: amigos.estado,
  //   })
  //   .from(amigos)
  //   .where(
  //     or(
  //       eq(amigos.idUsuario1, usuarioId),
  //       eq(amigos.idUsuario2, usuarioId)
  //     )
  //   );

  // // Ahora, para cada relación recuperamos los nombres de ambos usuarios
  // const resultados = await Promise.all(
  //   relaciones.map(async (relacion) => {
  //     const usuario1 = await db
  //       .select({ nombre: usuarios.nombre })
  //       .from(usuarios)
  //       .where(eq(usuarios.id, relacion.idUsuario1))
  //       .then(res => res[0]);

  //     const usuario2 = await db
  //       .select({ nombre: usuarios.nombre })
  //       .from(usuarios)
  //       .where(eq(usuarios.id, relacion.idUsuario2))
  //       .then(res => res[0]);

  //     const soyUsuario1 = (relacion.idUsuario1 === usuarioId);

  //     return {
  //       id: relacion.id,
  //       miId: soyUsuario1 ? relacion.idUsuario1 : relacion.idUsuario2,
  //       amigoId: soyUsuario1 ? relacion.idUsuario2 : relacion.idUsuario1,
  //       nombre: soyUsuario1 ? usuario2?.nombre : usuario1?.nombre,
  //       estado: relacion.estado,
  //     };
  //   })
  // );

  return NextResponse.json(resultados[0]);
}
