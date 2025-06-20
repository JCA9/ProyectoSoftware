"use client";
import Sidebar from "../../components/Sidebar";

const logros = [
  {
    id: 1,
    titulo: "¡Primera Variable!",
    descripcion: "Completaste tu primera lección en Fundamentos",
    mundo: "Fundamentos",
    color: "bg-green-100",
  },
  {
    id: 2,
    titulo: "Control Maestro",
    descripcion: "Completaste todos los if y loops",
    mundo: "Control de Flujo",
    color: "bg-blue-100",
  },
  {
    id: 3,
    titulo: "Funciones 101",
    descripcion: "Usaste funciones correctamente en un reto",
    mundo: "Funciones y Lógica",
    color: "bg-purple-100",
  },
  {
    id: 4,
    titulo: "Fundamentos Pro",
    descripcion: "Completaste todas las lecciones del Mundo 1",
    mundo: "Fundamentos",
    color: "bg-green-200",
  },
];

export default function LogrosPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Tus Logros</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {logros.map((logro) => (
            <div
              key={logro.id}
              className={`rounded-xl p-6 shadow-md ${logro.color} text-slate-800`}
            >
              <h2 className="text-xl font-bold">{logro.titulo}</h2>
              <p className="text-sm mb-2">{logro.descripcion}</p>
              <span className="text-xs bg-white/50 px-2 py-1 rounded">
                {logro.mundo}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
