"use client";
import Sidebar from "../components/Sidebar";

export default function DashboardInicio() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar fijo (importado como componente) */}
      <Sidebar />

      {/* Contenido principal */}
    <main className="flex-1 bg-slate-50 px-4 py-6 md:px-10 md:py-8 md:ml-64 w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Inicio</h1>

        {/* Placeholder para sistema de posteo tipo hilos */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-400">
            <p className="text-gray-600">Aquí se mostrará el post de un amigo (hilo principal)</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Respuesta 1</div>
              <div className="bg-slate-100 p-3 rounded">Respuesta 2</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-gray-600">Otro post reciente en el hilo</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Comentario</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-gray-600">
              <span className="font-semibold">Publicación</span> destacada o de tu progreso
            </p>
          </div>
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-400">
            <p className="text-gray-600">Aquí se mostrará el post de un amigo (hilo principal)</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Respuesta 1</div>
              <div className="bg-slate-100 p-3 rounded">Respuesta 2</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-gray-600">Otro post reciente en el hilo</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Comentario</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-gray-600">
              <span className="font-semibold">Publicación</span> destacada o de tu progreso
            </p>
          </div>
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-400">
            <p className="text-gray-600">Aquí se mostrará el post de un amigo (hilo principal)</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Respuesta 1</div>
              <div className="bg-slate-100 p-3 rounded">Respuesta 2</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-gray-600">Otro post reciente en el hilo</p>
            <div className="mt-4 ml-6 space-y-2">
              <div className="bg-slate-100 p-3 rounded">Comentario</div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-400">
            <p className="text-gray-600">
              <span className="font-semibold">Publicación</span> destacada o de tu progreso
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
