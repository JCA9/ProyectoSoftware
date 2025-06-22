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

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 bg-slate-50 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Lecciones del Mundo</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lecciones.map((leccion) => (
              <Link key={leccion.id} href={`/dashboard/lecciones/${leccion.id}`}>
                <div className={`rounded-xl p-6 shadow-md cursor-pointer hover:scale-105 transition-all bg-blue-100`}>
                  <h2 className="text-xl font-bold mb-2 text-slate-800">{leccion.nombre}</h2>
                  <p className="text-slate-600">{leccion.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
