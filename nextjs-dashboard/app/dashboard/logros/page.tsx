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

        // Aquí definimos los logros visuales con colores (los estáticos que tú ya tenías)
        const logrosDefinidos: Omit<Logro, "desbloqueado">[] = [
          { id: 1, titulo: "¡Primer Paso!", descripcion: "Completaste tu primera lección en Fundamentos de Python", mundo: "Mundo 1: Fundamentos de Python", color: "bg-green-100" },
          { id: 2, titulo: "Dominio básico", descripcion: "Completaste todas las lecciones del Mundo 1", mundo: "Mundo 1: Fundamentos de Python", color: "bg-blue-100" },
          { id: 3, titulo: "Control total", descripcion: "Completaste todas las lecciones del Mundo 2", mundo: "Mundo 2: Control de Flujos", color: "bg-purple-100" },
          { id: 4, titulo: "Maestro de funciones", descripcion: "Completaste todas las lecciones del Mundo 3", mundo: "Mundo 3: Funciones en Python", color: "bg-green-200" },
          { id: 5, titulo: "Explorador", descripcion: "Has completado el 100% de CodeQuest.", mundo: "Dios de la Programación", color: "bg-green-200" },
        ];

        // Combinamos backend + visual
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
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Tus Logros</h1>

          {loading ? (
            <p className="text-center">Cargando logros...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {logros.map((logro) => (
                <div
                  key={logro.id}
                  className={`rounded-xl p-6 shadow-md ${logro.desbloqueado ? logro.color : "bg-slate-200 text-slate-400"}`}
                >
                  <h2 className={`text-xl font-bold ${logro.desbloqueado ? "" : "line-through"}`}>
                    {logro.titulo}
                  </h2>
                  <p className="text-sm mb-2">{logro.descripcion}</p>
                  <span className="text-xs bg-white/50 px-2 py-1 rounded">
                    {logro.mundo}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
