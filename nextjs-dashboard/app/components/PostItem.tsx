"use client";
import { useEffect, useState } from "react";
import { getPostConRespuestas, responderPost } from "../lib/api/api";
import { useUser } from "@/context/UserContext";

interface Respuesta {
  id: number;
  nombreUsuario: string;
  contenido: string;
  fechaCreacion: string;
}

interface PostItemProps {
  postId: number;
  nombreUsuario: string;
  contenido: string;
  fechaCreacion: string;
}

export default function PostItem({ postId, nombreUsuario, contenido, fechaCreacion }: PostItemProps) {
  const { usuario } = useUser();
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const [cargandoRespuestas, setCargandoRespuestas] = useState(false);

  useEffect(() => {
    cargarRespuestas();
  }, []);

  async function cargarRespuestas() {
    setCargandoRespuestas(true);
    try {
      const data = await getPostConRespuestas(postId);
      setRespuestas(data.respuestas);
    } catch (error) {
      console.error("Error al cargar respuestas:", error);
    } finally {
      setCargandoRespuestas(false);
    }
  }

  async function handleResponder(e: React.FormEvent) {
    e.preventDefault();
    if (!nuevaRespuesta.trim()) return;

    try {
      await responderPost(usuario!.id, postId, nuevaRespuesta.trim());
      setNuevaRespuesta("");
      await cargarRespuestas();
    } catch (error) {
      console.error("Error al responder:", error);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-400">
      <p className="font-semibold text-green-600">{nombreUsuario}</p>
      <p className="text-gray-600 mt-2">{contenido}</p>
      <p className="text-sm text-gray-400 mt-2">{new Date(fechaCreacion).toLocaleString()}</p>

      <div className="mt-4 ml-4 space-y-2">
        {cargandoRespuestas ? (
          <p className="text-gray-500 text-sm">Cargando respuestas...</p>
        ) : (
          respuestas.map((respuesta) => (
            <div key={respuesta.id} className="bg-slate-100 p-3 rounded">
              <span className="font-medium text-slate-700">{respuesta.nombreUsuario}: </span>
              {respuesta.contenido}
            </div>
          ))
        )}
      </div>

      {/* Formulario para responder */}
      <form onSubmit={handleResponder} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={nuevaRespuesta}
          onChange={(e) => setNuevaRespuesta(e.target.value)}
          placeholder="Responder..."
          className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
}
