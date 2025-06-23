"use client";
import Sidebar from "../../../components/Sidebar";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getLeccion, registrarProgreso } from "../../../lib/api/api";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LeccionPage() {
  const { usuario } = useUser();
  const params = useParams();
  const router = useRouter();
  const leccionId = parseInt(params.id as string);
  const [leccion, setLeccion] = useState<any>(null);
  const [respuestas, setRespuestas] = useState<any>({});
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarLeccion() {
      try {
        const data = await getLeccion(leccionId);
        setLeccion(data);
      } catch (err) {
        console.error("Error al obtener lección:", err);
      }
    }
    cargarLeccion();
  }, [leccionId]);

  async function manejarEnvio() {
    if (!usuario) return;

    let correcto = true;

    for (const pregunta of leccion.preguntas) {
      const respuestaUsuario = respuestas[pregunta.id];

      if (leccion.tipoPregunta === 'texto') {
        if (respuestaUsuario?.trim().toLowerCase() !== pregunta.respuesta.trim().toLowerCase()) {
          correcto = false;
          break;
        }
      } 
      else if (leccion.tipoPregunta === 'multiple' || leccion.tipoPregunta === 'booleano') {
        const opcionSeleccionada = pregunta.opciones?.find((o: any) => o.id === parseInt(respuestaUsuario));
        if (!opcionSeleccionada || !opcionSeleccionada.esCorrecta) {
          correcto = false;
          break;
        }
      }
    }

    if (correcto) {
      setMensaje("✅ ¡Todas las respuestas son correctas!");
      await registrarProgreso(usuario.id, leccion.id, 100);
      setTimeout(() => router.push("/dashboard/progreso"), 1500);
    } else {
      setMensaje("❌ Algunas respuestas son incorrectas. Intenta nuevamente.");
    }
  }

  if (!leccion) return <div className="p-10">Cargando lección...</div>;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">{leccion.nombre}</h1>
          <p className="mb-4 text-lg">{leccion.descripcion}</p>

          <div className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-6">
            {leccion.preguntas.map((pregunta: any) => (
              <div key={pregunta.id}>
                <p className="font-semibold text-slate-700 mb-2">{pregunta.enunciado}</p>

                {leccion.tipoPregunta === 'texto' && (
                  <input
                    type="text"
                    value={respuestas[pregunta.id] || ""}
                    onChange={(e) => setRespuestas({ ...respuestas, [pregunta.id]: e.target.value })}
                    className="border p-3 rounded w-full mb-4"
                    placeholder="Escribe tu respuesta..."
                  />
                )}

                {(leccion.tipoPregunta === 'multiple' || leccion.tipoPregunta === 'booleano') && (
                  <div className="space-y-2">
                    {pregunta.opciones?.length > 0 ? (
                      pregunta.opciones.map((opcion: any) => (
                        <label key={opcion.id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`pregunta_${pregunta.id}`}
                            value={opcion.id}
                            checked={respuestas[pregunta.id] === opcion.id}
                            onChange={() => setRespuestas({ ...respuestas, [pregunta.id]: opcion.id })}
                          />
                          {opcion.textoOpcion}
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-red-500">⚠ No hay opciones registradas para esta pregunta</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            <button
              className="bg-green-500 text-white px-6 py-2 rounded font-semibold"
              onClick={manejarEnvio}
            >
              Enviar Respuestas
            </button>

            {mensaje && <p className="mt-4 font-bold">{mensaje}</p>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
