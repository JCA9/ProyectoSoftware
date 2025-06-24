"use client";
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getLogros } from "../../lib/api/api";

interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  mundo: string;
  color: string;
  desbloqueado: boolean;
  imagen: string;
}

export default function LogrosPage() {
  const { usuario } = useUser();
  const [logros, setLogros] = useState<Logro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) return;
    async function cargarLogros() {
      try {
        const data = await getLogros(usuario!.id);

        const logrosDefinidos: Omit<Logro, "desbloqueado">[] = [
          { id: 1, titulo: "¡Primer Paso!", descripcion: "Completaste tu primera lección en Fundamentos de Python", mundo: "Mundo 1: Fundamentos de Python", color: "from-green-400 to-green-600", imagen: "/logros/1.jpg" },
          { id: 2, titulo: "Dominio básico", descripcion: "Completaste todas las lecciones del Mundo 1", mundo: "Mundo 1: Fundamentos de Python", color: "from-blue-400 to-blue-600", imagen: "/logros/2.jpg" },
          { id: 3, titulo: "Control total", descripcion: "Completaste todas las lecciones del Mundo 2", mundo: "Mundo 2: Control de Flujos", color: "from-purple-400 to-purple-600", imagen: "/logros/3.jpg" },
          { id: 4, titulo: "Maestro de funciones", descripcion: "Completaste todas las lecciones del Mundo 3", mundo: "Mundo 3: Funciones en Python", color: "from-yellow-400 to-yellow-600", imagen: "/logros/4.jpg" },
          { id: 5, titulo: "Explorador", descripcion: "Has completado el 100% de CodeQuest.", mundo: "Dios de la Programación", color: "from-pink-400 to-pink-600", imagen: "/logros/5.jpg" },
        ];

        const logrosCombinados: Logro[] = logrosDefinidos.map((logro) => ({
          ...logro,
          desbloqueado: data.some((l: any) => l.id === logro.id),
        }));

        setLogros(logrosCombinados);
      } catch (error) {
        console.error("Error al cargar logros:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarLogros();
  }, [usuario]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-8 md:ml-64 w-full">
          <h1 className="text-5xl font-extrabold text-white mb-12 flex items-center gap-4">
            🏅 Tus Logros
          </h1>

          {loading ? (
            <div className="text-center text-white text-xl animate-pulse">
              🔄 Cargando logros...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {logros.map((logro) => (
                <div
                  key={logro.id}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all transform hover:scale-105 ${logro.desbloqueado ? "" : "grayscale opacity-50"
                    }`}
                >
                  <img
                    src={logro.imagen}
                    alt={logro.titulo}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
                  <div className="relative z-10 p-8 text-white flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className={`text-2xl font-bold ${!logro.desbloqueado ? "line-through" : ""}`}>
                        {logro.titulo}
                      </h2>
                      {logro.desbloqueado ? (
                        <span className="text-4xl animate-bounce"></span>
                      ) : (
                        <span className="text-4xl">🔒</span>
                      )}
                    </div>
                    <p className="text-lg mb-4">{logro.descripcion}</p>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white bg-opacity-30">
                      {logro.mundo}
                    </span>
                  </div>
                </div>

              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
