"use client";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const amigosSimulados = [
  { id: 1, nombre: "Luis Dev", estado: "En línea" },
  { id: 2, nombre: "Ana JS", estado: "Desconectado" },
  { id: 3, nombre: "CodeMaster42", estado: "En línea" },
];

export default function AmigosPage() {
  const [amigos, setAmigos] = useState(amigosSimulados);
  const [nuevoAmigo, setNuevoAmigo] = useState("");

  const agregarAmigo = () => {
    if (!nuevoAmigo.trim()) return;

    setAmigos((prev) => [
      ...prev,
      { id: Date.now(), nombre: nuevoAmigo, estado: "Pendiente" },
    ]);
    setNuevoAmigo("");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Amigos</h1>

        {/* Agregar nuevo amigo */}
        <div className="mb-8 bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
          <input
            type="text"
            placeholder="Nombre de usuario o código"
            value={nuevoAmigo}
            onChange={(e) => setNuevoAmigo(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={agregarAmigo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            Agregar
          </button>
        </div>

        {/* Lista de amigos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amigos.map((amigo) => (
            <div
              key={amigo.id}
              className="bg-white shadow rounded-xl p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-slate-800">{amigo.nombre}</h2>
              <p className="text-sm text-gray-600 mb-2">{amigo.estado}</p>
              <button className="text-green-600 hover:underline text-sm text-left">
                Ver perfil
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
