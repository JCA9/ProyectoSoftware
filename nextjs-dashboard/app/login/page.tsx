"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { loginUsuario } from "../lib/api/api";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setUsuario } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usuario = await loginUsuario(correo, contrasena);
      setUsuario(usuario);
      router.push("/dashboard"); // Redirige al dashboard al iniciar sesión
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña inválidos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-0 transition-transform duration-300 hover:-translate-y-4">
        <Image src="/publicaciones/Saludando.png" alt="Personaje CodeQuest" width={300} height={300} className="object-contain" />
      </div>

      <div className="relative z-10 bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Inicia sesión en CodeQuest</h2>

        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input type="email" id="correo" required value={correo} onChange={(e) => setCorreo(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="contrasena" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
          </div>

          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all">
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-green-600 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
