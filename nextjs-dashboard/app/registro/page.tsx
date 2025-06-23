"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { registrarUsuario, loginUsuario } from "../lib/api/api";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setUsuario } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registrarUsuario(nombre, correo, contrasena);
      
      const usuario = await loginUsuario(correo, contrasena);
      setUsuario(usuario);
      
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Error al registrar. Puede que el correo ya esté en uso.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center relative overflow-hidden">
      
      {/* Imagen central animada */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0 animate-float">
        <Image src="/publicaciones/Asombro.png" alt="Personaje CodeQuest" width={300} height={300} className="object-contain drop-shadow-lg" />
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">¡Únete a CodeQuest!</h2>

        {error && <div className="mb-4 text-red-400 font-semibold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-white mb-2">Nombre</label>
            <input
              type="text"
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-semibold text-white mb-2">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
              placeholder="ejemplo@codequest.com"
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-semibold text-white mb-2">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
              placeholder="Crea una contraseña segura"
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-extrabold py-4 rounded-xl transition-transform hover:scale-105 shadow-lg text-lg">
            Crear cuenta 🚀
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-green-400 hover:underline font-bold">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      {/* Animación flotante */}
      <style jsx>{`
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -20px); }
        }
      `}</style>
    </div>
  );
}
