"use client";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getLeccionesPorMundo } from "../../../lib/api/api";
import { useParams } from "next/navigation";

interface Leccion {
  id: number;
  nombre: string;
  descripcion: string;
}

export default function LeccionesPage() {
  const params = useParams();
  const mundoId = parseInt(params.id as string);
  const [lecciones, setLecciones] = useState<Leccion[]>([]);

  useEffect(() => {
    async function cargarLecciones() {
      try {
        const data = await getLeccionesPorMundo(mundoId);
        setLecciones(data);
      } catch (err) {
        console.error("Error al obtener lecciones:", err);
      }
    }
    cargarLecciones();
  }, [mundoId]);

  const gradientes = [
    "from-green-400 to-green-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-indigo-400 to-indigo-600",
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white mb-16 flex items-center gap-4">
            📚 Lecciones del Mundo
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 w-full">
            {lecciones.map((leccion, index) => (
              <Link key={leccion.id} href={`/dashboard/lecciones/${leccion.id}`} className="transition-transform hover:scale-105">
                <div className={`bg-gradient-to-br ${gradientes[index % gradientes.length]} rounded-3xl p-10 shadow-2xl text-white flex flex-col justify-between h-72 cursor-pointer`}>
                  <h2 className="text-3xl font-extrabold mb-4">{leccion.nombre}</h2>
                  <p className="text-white/90 text-lg">{leccion.descripcion}</p>
                  <div className="mt-auto text-right text-4xl animate-pulse">🚀</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
