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
  bloqueado?: boolean; // Agregamos opcionalmente el estado bloqueado decorativo
}

export default function MundosPage() {
  const [mundos, setMundos] = useState<Mundo[]>([]);

  useEffect(() => {
    async function cargarMundos() {
      try {
        const data = await getMundos();

        // Agregamos mundos decorativos bloqueados
        const decorativos: Mundo[] = [
          {
            id: 9991,
            nombre: "Mundo 4: Manipulación de Datos \n PROXIMAMENTE",
            descripcion: "Aprende a manejar colecciones, listas, diccionarios y estructuras avanzadas.",
            orden: 4,
            bloqueado: true
          },
          {
            id: 9992,
            nombre: "Mundo 5: Programación Orientada a Objetos \n PROXIMAMENTE",
            descripcion: "Descubre cómo crear clases, objetos y diseñar software modular.",
            orden: 5,
            bloqueado: true
          },
          {
            id: 9993,
            nombre: "Mundo 6: Inteligencia Artificial Básica \n PROXIMAMENTE",
            descripcion: "Tus primeros pasos con modelos, predicciones y algoritmos inteligentes.",
            orden: 6,
            bloqueado: true
          }
        ];

        setMundos([...data, ...decorativos]);
      } catch (err) {
        console.error("Error al obtener mundos:", err);
      }
    }
    cargarMundos();
  }, []);

  const gradientes = [
    "from-green-400 to-green-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-yellow-400 to-yellow-600",
    "from-pink-400 to-pink-600",
    "from-indigo-400 to-indigo-600",
    "from-rose-400 to-rose-600",
    "from-cyan-400 to-cyan-600"
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white mb-16 flex items-center gap-4">
            Explora los Mundos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 w-full">
            {mundos.map((mundo, index) => {
              const imageUrl = `/images/mundos/mundo${index + 1}.png`; // Suponiendo nombres de imagen secuenciales
              return mundo.bloqueado ? (
                <div
                  key={mundo.id}
                  className={`rounded-3xl shadow-2xl text-white flex flex-col justify-between h-72 cursor-not-allowed bg-cover bg-center relative`}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
                  <div className="relative p-10">
                    <div className="flex justify-between items-start">
                      <h2 className="text-3xl font-extrabold mb-4">{mundo.nombre}</h2>
                      <div className="text-4xl">🔒</div>
                    </div>
                    <p className="text-white/90 text-lg">{mundo.descripcion}</p>
                  </div>
                </div>
              ) : (
                <Link key={mundo.id} href={`/dashboard/mundos/${mundo.id}`} className="transition-transform hover:scale-110">
                  <div
                    className={`rounded-3xl shadow-2xl text-white flex flex-col justify-between h-80 cursor-pointer bg-cover bg-center relative`}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-black/65 rounded-3xl"></div>
                    <div className="relative p-10">
                      <h2 className="text-3xl font-extrabold mb-4">{mundo.nombre}</h2>
                      <p className="text-white/90 text-lg">{mundo.descripcion}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
