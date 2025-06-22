"use client";
import Sidebar from "../../../../../components/Sidebar";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLeccion, registrarProgreso } from "../../../../../lib/api/api";
import { useUser } from "@/context/UserContext";

interface Leccion {
  id: number;
  idMundo: number;
  nombre: string;
  descripcion: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

export default function LeccionPage() {
  const { id, leccionId } = useParams<{ id: string; leccionId: string }>();
  const router = useRouter();
  const { usuario } = useUser();
  const [leccion, setLeccion] = useState<Leccion | null>(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await getLeccion(parseInt(leccionId));
      setLeccion(data);
    }
    cargar();
  }, [leccionId]);

  async function manejarEnvio() {
    if (!leccion || !usuario) return;

    if (respuestaSeleccionada === leccion.respuestaCorrecta) {
      setFeedback("✅ ¡Respuesta correcta!");

      // Registramos el progreso
      await registrarProgreso(usuario.id, leccion.id, 100);

      // Pequeño delay para mostrar el feedback y luego regresar
      setTimeout(() => {
        router.push(`/dashboard/mundos/${id}`);
      }, 1500);
    } else {
      setFeedback("❌ Respuesta incorrecta. Inténtalo de nuevo.");
    }
  }

  if (!leccion) return <p className="p-10">Cargando lección...</p>;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            {leccion.nombre}
          </h1>
          <p className="mb-8 text-slate-600">{leccion.descripcion}</p>

          <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{leccion.pregunta}</h2>
            <div className="space-y-3">
              {leccion.opciones.map((opcion, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="respuesta"
                    id={`opcion-${index}`}
                    value={opcion}
                    checked={respuestaSeleccionada === opcion}
                    onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`opcion-${index}`} className="cursor-pointer">
                    {opcion}
                  </label>
                </div>
              ))}
            </div>

            <button
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md font-semibold"
              onClick={manejarEnvio}
            >
              Enviar respuesta
            </button>

            {feedback && (
              <p className="mt-4 text-lg font-semibold text-center">
                {feedback}
              </p>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
