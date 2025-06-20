"use client";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

const mundos = [
    {
        id: 1,
        nombre: "Mundo 1: Fundamentos",
        descripcion: "Aprende las bases de la programación, variables, tipos y operadores.",
        color: "bg-green-100",
    },
    {
        id: 2,
        nombre: "Mundo 2: Control de Flujo",
        descripcion: "Explora condicionales, bucles y estructuras de decisión.",
        color: "bg-blue-100",
    },
    {
        id: 3,
        nombre: "Mundo 3: Funciones y Lógica",
        descripcion: "Domina funciones, argumentos y la lógica para resolver problemas.",
        color: "bg-purple-100",
    },
];

export default function MundosPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar fijo (importado como componente) */}
            <Sidebar />
            <main className="flex-1 bg-slate-50 p-6 md:ml-64 w-full min-h-screen">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Explora los Mundos</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-3/4">
                    {mundos.map((mundo) => (
                        <Link key={mundo.id} href={`/dashboard/mundos/${mundo.id}`}>
                            <div
                                className={`rounded-xl mt-40 p-6 shadow-md cursor-pointer hover:scale-105 transition-all h-3/4 ${mundo.color}`}
                            >
                                <h2 className="text-xl font-bold mb-2 text-slate-800">{mundo.nombre}</h2>
                                <p className="text-slate-600">{mundo.descripcion}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
            );
}
