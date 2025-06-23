import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { logrosUsuarios } from "../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  const usuarioId = parseInt(params.usuarioId);

  if (isNaN(usuarioId)) {
    return NextResponse.json({ error: "ID de usuario inválido" }, { status: 400 });
  }

  try {
    const desbloqueados = await db
      .select({ id: logrosUsuarios.idLogro })
      .from(logrosUsuarios)
      .where(eq(logrosUsuarios.idUsuario, usuarioId));

    return NextResponse.json(desbloqueados);
  } catch (error) {
    console.error("Error al obtener logros:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
