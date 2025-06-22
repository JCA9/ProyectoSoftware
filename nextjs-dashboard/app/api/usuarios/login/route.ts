import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { usuarios } from "../../../lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface LoginPayload {
  correo: string;
  contrasena: string;
}

export async function POST(request: Request) {
  try {
    const data: LoginPayload = await request.json();

    if (!data.correo || !data.contrasena) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Buscamos el usuario
    const user = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, data.correo));

    if (user.length === 0) {
      return NextResponse.json({ error: "Correo o contraseña inválidos" }, { status: 401 });
    }

    const usuario = user[0];

    const validPassword = await bcrypt.compare(data.contrasena, usuario.contrasenaHash);

    if (!validPassword) {
      return NextResponse.json({ error: "Correo o contraseña inválidos" }, { status: 401 });
    }

    // Devolvemos solo los datos públicos del usuario
    return NextResponse.json({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      avatarUrl: usuario.avatarUrl,
    });
  } catch (error) {
    console.error("Error al loguear usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
