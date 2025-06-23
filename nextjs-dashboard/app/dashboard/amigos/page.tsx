"use client";
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import {
  getAmigos,
  enviarSolicitudAmistad,
  actualizarSolicitudAmistad,
} from "../../lib/api/api";

interface Amigo {
  id: number;
  miId: number;
  amigoId: number;
  nombreMio: string;
  nombreAmigo: string;
  nombre: string; // Nombre del usuario logueado
  estado: "pendiente" | "aceptado" | "rechazado";
}

export default function AmigosPage() {
  const { usuario } = useUser();
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [pendientes, setPendientes] = useState<Amigo[]>([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState<Amigo[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<Amigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) return;
    cargarAmigos();
  }, [usuario]);

  async function cargarAmigos() {
    setLoading(true);
    try {
      if (!usuario) return;
      const data = await getAmigos(usuario.id);
      console.log("Backend:", data);
      console.log("Usuario logueado:", usuario);

      const aceptados = data.filter((a: { estado: string; }) => a.estado === "aceptado");
      const solicitudesEnviadas = data.filter((a: { estado: string; miId: number; }) => a.estado === "pendiente" && a.miId === usuario.id);
      const pendientesRecibidos = data.filter((a: { estado: string; amigoId: number; }) => a.estado === "pendiente" && a.amigoId === usuario.id);

      setAmigos(aceptados);
      setSolicitudesEnviadas(solicitudesEnviadas);
      setPendientes(pendientesRecibidos);
    } catch (error) {
      console.error("Error al cargar amigos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function buscarUsuarios() {
    if (!nuevoNombre.trim()) return;
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/buscar?nombre=${nuevoNombre}`);
      if (!res.ok) throw new Error("Error buscando usuarios");
      const data = await res.json();

      if (!usuario) return;

      const filtrados = data.filter(
        (u: any) =>
          u.id !== usuario.id &&
          !amigos.some(a => a.miId === u.id || a.amigoId === u.id) &&
          !pendientes.some(a => a.miId === u.id || a.amigoId === u.id) &&
          !solicitudesEnviadas.some(a => a.miId === u.id || a.amigoId === u.id)
      );

      setResultadosBusqueda(filtrados);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  }

  async function enviarSolicitud(idUsuarioDestino: number) {
    try {
      if (!usuario) return;
      await enviarSolicitudAmistad(usuario.id, idUsuarioDestino);
      setResultadosBusqueda([]);
      setNuevoNombre("");
      await cargarAmigos();
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }

  async function aceptarSolicitud(idRelacion: number) {
    try {
      if (!usuario) return;
      await actualizarSolicitudAmistad(idRelacion, usuario.id, "aceptado");
      await cargarAmigos();
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
    }
  }

  async function rechazarSolicitud(idRelacion: number) {
    try {
      if (!usuario) return;
      await actualizarSolicitudAmistad(idRelacion, usuario.id, "rechazado");
      await cargarAmigos();
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Amigos</h1>

          {/* Buscar usuario */}
          <div className="mb-8 bg-white shadow-md rounded-xl p-6">
            <div className="flex gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Buscar usuario por nombre"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button onClick={buscarUsuarios} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold">
                Buscar
              </button>
            </div>

            {resultadosBusqueda.length > 0 ? (
              <div className="space-y-3">
                {resultadosBusqueda.map((u) => (
                  <div key={u.id} className="flex justify-between items-center bg-slate-100 p-3 rounded">
                    <p className="font-bold">{u.nombre}</p>
                    <button onClick={() => enviarSolicitud(u.id)} className="bg-green-500 text-white px-3 py-1 rounded-md">
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              nuevoNombre && <p className="text-center text-sm text-gray-500">No se encontraron usuarios.</p>
            )}
          </div>

          {/* Solicitudes recibidas */}
          <h2 className="text-xl font-semibold mb-4">Solicitudes recibidas</h2>
          {pendientes.length === 0 ? (
            <p className="text-center text-gray-500">No tienes solicitudes nuevas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {pendientes.map((p) => (
                <div key={p.id} className="bg-white shadow rounded-xl p-6 border-l-4 border-yellow-400">
                  <h2 className="text-xl font-bold">{p.nombreMio}</h2>
                  <p className="text-sm text-gray-600 mb-2">Pendiente</p>
                  <div className="flex gap-2">
                    <button onClick={() => aceptarSolicitud(p.miId)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                      Aceptar
                    </button>
                    <button onClick={() => rechazarSolicitud(p.miId)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Solicitudes enviadas */}
          <h2 className="text-xl font-semibold mb-4">Solicitudes enviadas</h2>
          {solicitudesEnviadas.length === 0 ? (
            <p className="text-center text-gray-500">No tienes solicitudes enviadas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {solicitudesEnviadas.map((p) => (
                <div key={p.id} className="bg-white shadow rounded-xl p-6 border-l-4 border-yellow-400">
                  <h2 className="text-xl font-bold">{p.nombreAmigo}</h2>
                  <p className="text-sm text-gray-600 mb-2">Esperando aceptación</p>
                </div>
              ))}
            </div>
          )}

          {/* Amigos aceptados */}
          <h2 className="text-xl font-semibold mb-4">Tus amigos</h2>
          {amigos.length === 0 ? (
            <p className="text-center text-gray-500">Aún no tienes amigos agregados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amigos.map((a) => (
                <div key={a.id} className="bg-white shadow rounded-xl p-6 border-l-4 border-green-400">
                  <h2 className="text-xl font-bold">{usuario ? (a.miId === usuario.id ? a.nombreAmigo : a.nombreMio) : ""}</h2>
                  <p className="text-sm text-gray-600 mb-2">Amigo confirmado</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}