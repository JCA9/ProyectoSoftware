import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { lecciones } from "../../../lib/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  // 👇 OJO: como estás usando middleware, hay que hacer el await
  const { id } = await context.params;
  const mundoId = parseInt(id);

  if (isNaN(mundoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(lecciones)
      .where(eq(lecciones.idMundo, mundoId))
      .orderBy(asc(lecciones.orden));  // 👈 ahora sí tienes el order correcto

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener lecciones:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
