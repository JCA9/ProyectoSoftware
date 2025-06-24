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
  imagen: string;
}

export default function LeccionesPage() {
  const params = useParams();
  const mundoId = parseInt(params.id as string);
  const [lecciones, setLecciones] = useState<Leccion[]>([]);

  useEffect(() => {
    async function cargarLecciones() {
      try {
        const data = await getLeccionesPorMundo(mundoId);

        // Agregamos las imágenes aquí:
        const dataConImagenes = data.map((leccion: any) => {
          let imagen = "/lecciones/default.png";

          switch (leccion.nombre) {
            case "Tipos de datos":
              imagen = "/lecciones/1.png";
              break;
            case "Imprimir en consola":
              imagen = "/lecciones/2.jpg";
              break;
            case "Asignación de variables":
              imagen = "/lecciones/3.jpg";
              break;
            case "Nombres de variables válidos":
              imagen = "/lecciones/4.jpg";
              break;
            case "Operadores lógicos":
              imagen = "/lecciones/5.jpg";
              break;
            case "Comentarios":
              imagen = "/lecciones/6.jpg";
              break;
            case "Condicionales":
              imagen = "/lecciones/7.jpg";
              break;
            case "Bucle for":
              imagen = "/lecciones/8.jpg";
              break;
            case "Bucle while":
              imagen = "/lecciones/9.jpg";
              break;
            case "Errores de concatenación":
              imagen = "/lecciones/10.jpg";
              break;
            case "Listas y acceso por índice":
              imagen = "/lecciones/11.jpg";
              break;
            case "Casting de datos":
              imagen = "/lecciones/12.jpg";
              break;
            case "Funciones básicas":
              imagen = "/lecciones/13.jpg";
              break;
            case "Funciones sin argumentos":
              imagen = "/lecciones/14.jpg";
              break;
            case "Definición de función":
              imagen = "/lecciones/15.jpg";
              break;
            case "Uso de parámetros":
              imagen = "/lecciones/16.jpg";
              break;
            case "Funciones booleanas":
              imagen = "/lecciones/17.jpg";
              break;
            case "Parámetros por defecto":
              imagen = "/lecciones/18.jpg";
              break;
          }

          return { ...leccion, imagen };
        });

        setLecciones(dataConImagenes);
      } catch (err) {
        console.error("Error al obtener lecciones:", err);
      }
    }
    cargarLecciones();
  }, [mundoId]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 p-10 md:ml-64 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white mb-16 flex items-center gap-4">
            Lecciones del Mundo
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 w-full">
            {lecciones.map((leccion) => (
              <Link key={leccion.id} href={`/dashboard/lecciones/${leccion.id}`} className="transition-transform hover:scale-105">
                <div className="relative rounded-3xl p-10 shadow-2xl text-white flex flex-col justify-between h-80 cursor-pointer bg-black/60 backdrop-blur-md border border-white/30">
                  <img
                    src={leccion.imagen}
                    alt={leccion.nombre}
                    className="w-full h-32 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-3xl font-extrabold mb-4">{leccion.nombre}</h2>
                  <p className="text-white/80 text-lg">{leccion.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
