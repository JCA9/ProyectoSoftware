import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { lecciones, preguntas, opciones } from '../../../lib/schema';
import { eq,and } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const leccionId = parseInt(params.id);

  if (isNaN(leccionId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    // Obtenemos la lección
    const leccionData = await db
      .select()
      .from(lecciones)
      .where(eq(lecciones.id, leccionId));

    if (leccionData.length === 0) {
      return NextResponse.json({ error: 'Lección no encontrada' }, { status: 404 });
    }

    const leccion = leccionData[0];

    // Obtenemos todas las preguntas de esta lección
    const preguntasData = await db
      .select()
      .from(preguntas)
      .where(eq(preguntas.idLeccion, leccionId));

    // Para cada pregunta, dependiendo del tipo de la lección, armamos las respuestas:
    const preguntasCompletas = await Promise.all(
      preguntasData.map(async (pregunta) => {
        if (leccion.tipoPregunta === 'texto') {
          // Para tipo texto, buscamos la opción correcta como "respuesta"
          const opcionCorrecta = await db
            .select()
            .from(opciones)
            .where(
              and(
                eq(opciones.idPregunta, pregunta.id),
                eq(opciones.esCorrecta, true)
              )
            )
            .limit(1);

          return {
            id: pregunta.id,
            enunciado: pregunta.enunciado,
            respuesta: opcionCorrecta.length > 0 ? opcionCorrecta[0].textoOpcion : null,
          };
        } else {
          // Para multiple y booleano, traemos todas las opciones
          const opcionesData = await db
            .select()
            .from(opciones)
            .where(eq(opciones.idPregunta, pregunta.id));

          return {
            id: pregunta.id,
            enunciado: pregunta.enunciado,
            opciones: opcionesData.map((op) => ({
              id: op.id,
              textoOpcion: op.textoOpcion,
              esCorrecta: op.esCorrecta,
            })),
          };
        }
      })
    );

    // Devolvemos el resultado completo
    return NextResponse.json({
      id: leccion.id,
      nombre: leccion.nombre,
      descripcion: leccion.descripcion,
      tipoPregunta: leccion.tipoPregunta,
      preguntas: preguntasCompletas,
    });

  } catch (error) {
    console.error("Error al obtener la lección:", error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
