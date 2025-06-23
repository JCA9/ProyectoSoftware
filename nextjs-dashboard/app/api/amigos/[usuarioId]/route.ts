import { db } from "../../../lib/db";
import { amigos, usuarios } from "../../../lib/schema";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { usuarioId: string } }) {
  const usuarioId = parseInt(params.usuarioId);

  const relaciones = await db
    .select({
      id: amigos.id,
      idUsuario1: amigos.idUsuario1,
      idUsuario2: amigos.idUsuario2,
      estado: amigos.estado,
    })
    .from(amigos)
    .where(
      or(
        eq(amigos.idUsuario1, usuarioId),
        eq(amigos.idUsuario2, usuarioId)
      )
    );

  const resultados = await Promise.all(
    relaciones.map(async (relacion) => {
      const usuario1 = await db
        .select({ nombre: usuarios.nombre })
        .from(usuarios)
        .where(eq(usuarios.id, relacion.idUsuario1))
        .then(res => res[0]);

      const usuario2 = await db
        .select({ nombre: usuarios.nombre })
        .from(usuarios)
        .where(eq(usuarios.id, relacion.idUsuario2))
        .then(res => res[0]);

      return {
        id: relacion.id,
        miId: relacion.idUsuario1,         // SIEMPRE quien envía
        amigoId: relacion.idUsuario2,     // SIEMPRE quien recibe
        estado: relacion.estado,
        nombreMio: usuario1?.nombre,      // SIEMPRE el nombre del que envía
        nombreAmigo: usuario2?.nombre,    // SIEMPRE el nombre del que recibe
      };
    })
  );

  console.log("Backend => Resultado final:", resultados);
  return NextResponse.json(resultados);
}
