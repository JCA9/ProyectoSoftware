import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { usuarios } from "../../../lib/schema";
import { sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get("nombre");

  if (!nombre) {
    return NextResponse.json({ error: "Nombre no proporcionado" }, { status: 400 });
  }

  try {
    const resultados = await db.execute(
      sql`
        SELECT id, nombre, correo
        FROM ${usuarios}
        WHERE LOWER(${usuarios.nombre}) LIKE LOWER(CONCAT('%', ${nombre}, '%'))
        LIMIT 10
      `
    );

    return NextResponse.json(resultados[0]);
  } catch (error) {
    console.error("Error en búsqueda:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
