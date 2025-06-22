import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { usuarios } from "../../../lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // usamos bcrypt para encriptar contraseña

interface RegistroPayload {
  nombre: string;
  correo: string;
  contrasena: string;
}

export async function POST(request: Request) {
  try {
    const data: RegistroPayload = await request.json();

    if (!data.nombre || !data.correo || !data.contrasena) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Validamos si ya existe el correo
    const existente = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, data.correo));

    if (existente.length > 0) {
      return NextResponse.json({ error: "Correo ya registrado" }, { status: 400 });
    }

    // Hasheamos la contraseña
    const hash = await bcrypt.hash(data.contrasena, 10);

    // Insertamos el nuevo usuario
    const result = await db.insert(usuarios).values({
      nombre: data.nombre,
      correo: data.correo,
      contrasenaHash: hash,
      fechaRegistro: new Date(),
    });

    return NextResponse.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
