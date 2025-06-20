"use client";
import Sidebar from "../../components/Sidebar";

export default function ProgresoPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Tu Progreso</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Placeholder: Progreso Total */}
          <div className="bg-green-100 rounded-xl shadow-md p-6 h-80 flex items-center justify-center text-green-800 font-semibold text-xl">
            Aquí irá la gráfica de Progreso Total
          </div>

          {/* Placeholder: Progreso por Mundo */}
          <div className="bg-blue-100 rounded-xl shadow-md p-6 h-80 flex items-center justify-center text-blue-800 font-semibold text-xl">
            Aquí irá la gráfica de Progreso por Mundo
          </div>
        </div>
      </main>
    </div>
  );
}
