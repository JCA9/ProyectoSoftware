"use client";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getMundos } from "../../lib/api/api";

interface Mundo {
  id: number;
  nombre: string;
  descripcion: string;
  orden: number;
}

export default function MundosPage() {
  const [mundos, setMundos] = useState<Mundo[]>([]);

  useEffect(() => {
    async function cargarMundos() {
      try {
        const data = await getMundos();
        setMundos(data);
      } catch (err) {
        console.error("Error al obtener mundos:", err);
      }
    }
    cargarMundos();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 bg-slate-50 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Explora los Mundos</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mundos.map((mundo) => (
              <Link key={mundo.id} href={`/dashboard/mundos/${mundo.id}`}>
                <div className={`rounded-xl p-6 shadow-md cursor-pointer hover:scale-105 transition-all bg-green-100`}>
                  <h2 className="text-xl font-bold mb-2 text-slate-800">{mundo.nombre}</h2>
                  <p className="text-slate-600">{mundo.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
