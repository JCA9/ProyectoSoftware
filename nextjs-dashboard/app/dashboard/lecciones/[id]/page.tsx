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

  if (!leccion) return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] justify-center items-center">
      <p className="text-white text-2xl animate-pulse">Cargando lección...</p>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white mb-10">{leccion.nombre}</h1>
          <p className="text-white/80 text-xl mb-12">{leccion.descripcion}</p>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-3xl space-y-10">
            {leccion.preguntas.map((pregunta: any) => (
              <div key={pregunta.id}>
                <p className="text-2xl font-bold text-white mb-4">{pregunta.enunciado}</p>

                {leccion.tipoPregunta === 'texto' && (
                  <input
                    type="text"
                    value={respuestas[pregunta.id] || ""}
                    onChange={(e) => setRespuestas({ ...respuestas, [pregunta.id]: e.target.value })}
                    className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                    placeholder="Escribe tu respuesta..."
                  />
                )}

                {(leccion.tipoPregunta === 'multiple' || leccion.tipoPregunta === 'booleano') && (
                  <div className="space-y-4 mt-2">
                    {pregunta.opciones?.length > 0 ? (
                      pregunta.opciones.map((opcion: any) => (
                        <label
                          key={opcion.id}
                          className={`flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition 
                            ${respuestas[pregunta.id] === opcion.id ? "bg-green-500/80 text-white" : "bg-white/20 text-white"}`}
                        >
                          <input
                            type="radio"
                            name={`pregunta_${pregunta.id}`}
                            value={opcion.id}
                            checked={respuestas[pregunta.id] === opcion.id}
                            onChange={() => setRespuestas({ ...respuestas, [pregunta.id]: opcion.id })}
                            className="hidden"
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

            <div className="flex justify-center">
              <button
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-extrabold py-4 px-10 rounded-2xl transition-transform hover:scale-110 shadow-lg text-xl"
                onClick={manejarEnvio}
              >
                Enviar Respuestas 🚀
              </button>
            </div>

            {mensaje && (
              <div className={`text-center font-bold text-xl ${mensaje.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                {mensaje}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
