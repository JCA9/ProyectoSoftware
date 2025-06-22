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
  id: number;          // ID del registro de la tabla amigos
  amigoId: number;      // ID del amigo (usuario)
  nombreAmigo: string;       // Nombre del amigo
  nombreMio: string;         // Mi nombre (usuario que envió la solicitud)
  estado: "pendiente" | "aceptado" | "rechazado";
  miId: number;        // ID del usuario que envió la solicitud
  nombre : string; // Nombre del usuario que envió la solicitud
}

export default function AmigosPage() {
  const { usuario } = useUser();
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [pendientes, setPendientes] = useState<Amigo[]>([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState<Amigo[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<Amigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [tuAmigos, setTuAmigos] = useState<Amigo[]>([]);

  useEffect(() => {
    if (!usuario) return;
    cargarAmigos();
  }, [usuario]);

  async function cargarAmigos() {
    setLoading(true);
    try {
      if (!usuario) return;
      const data = await getAmigos(usuario.id);
      console.log("Datos de amigos:", data);
      console.log("Usuario actual:", usuario);

      const aceptados = data.filter(
        (a: Amigo) => a.estado === "aceptado");
      console.log("Amigos aceptados:", aceptados);

      // Solicitudes que yo he enviado (yo soy usuario1)
      const solicitudesEnviadas = data.filter(
        (a: Amigo) => a.estado === "pendiente" && a.amigoId === usuario.id
      );

      const pendientesRecibidos = data.filter(
        (a: Amigo) => a.estado === "pendiente" && a.miId === usuario.id
      );

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
      const res = await fetch(
        `http://localhost:3000/api/usuarios/buscar?nombre=${nuevoNombre}`
      );
      if (!res.ok) throw new Error("Error buscando usuarios");
      const data = await res.json();
      // Filtrar: que no se busque a sí mismo ni a usuarios con relación existente
      const filtrados = data.filter(
        (u: any) =>
          u.id !== usuario!.id &&
          !amigos.some((a) => a.amigoId === u.id) &&
          !pendientes.some((a) => a.amigoId === u.id)
      );

      setResultadosBusqueda(filtrados);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  }

  async function enviarSolicitud(idUsuarioDestino: number) {
    try {
      await enviarSolicitudAmistad(usuario!.id, idUsuarioDestino);
      setResultadosBusqueda([]);
      setNuevoNombre("");
      await cargarAmigos();
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  }

  async function aceptarSolicitud(amigoId: number) {
    try {
      await actualizarSolicitudAmistad(amigoId, usuario!.id, "aceptado");
      await cargarAmigos();
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
    }
  }

  async function rechazarSolicitud(amigoId: number) {
    try {
      await actualizarSolicitudAmistad(amigoId, usuario!.id, "rechazado");
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

          {/* 🔎 Buscar nuevo amigo */}
          <div className="mb-8 bg-white shadow-md rounded-xl p-6">
            <div className="flex gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Buscar usuario por nombre"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={buscarUsuarios}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
              >
                Buscar
              </button>
            </div>

            {resultadosBusqueda.length > 0 ? (
              <div className="space-y-3">
                {resultadosBusqueda.map((usuarioEncontrado) => (
                  <div
                    key={usuarioEncontrado.id}
                    className="flex justify-between items-center bg-slate-100 p-3 rounded"
                  >
                    <div>
                      <p className="font-bold">{usuarioEncontrado.nombre}</p>
                      <p className="text-sm text-gray-500">
                        {usuarioEncontrado.nombre}
                      </p>
                    </div>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                      onClick={() => enviarSolicitud(usuarioEncontrado.id)}
                    >
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              nuevoNombre && (
                <p className="text-center text-sm text-gray-500">
                  No se encontraron usuarios.
                </p>
              )
            )}
          </div>

          {/* 🟡 Solicitudes pendientes */}
          <h2 className="text-xl font-semibold mb-4">Solicitudes recibidas</h2>
          {pendientes.length === 0 ? (
            <p className="text-center text-gray-500">No tienes solicitudes nuevas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {pendientes.map((pendiente) => (
                <div
                  key={pendiente.amigoId}
                  className="bg-white shadow rounded-xl p-6 flex flex-col justify-between border-l-4 border-yellow-400"
                >
                  <h2 className="text-xl font-bold text-slate-800">{pendiente.nombreAmigo}</h2>
                  <p className="text-sm text-gray-600 mb-2">Pendiente</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => aceptarSolicitud(pendiente.amigoId)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => rechazarSolicitud(pendiente.amigoId)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🟡 Solicitudes enviadas */}
          <h2 className="text-xl font-semibold mb-4">Solicitudes enviadas</h2>
          {solicitudesEnviadas.length === 0 ? (
            <p className="text-center text-gray-500">No tienes solicitudes enviadas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {solicitudesEnviadas.map((pendiente) => (
                <div
                  key={pendiente.amigoId}
                  className="bg-white shadow rounded-xl p-6 flex flex-col justify-between border-l-4 border-yellow-400"
                >
                  <h2 className="text-xl font-bold text-slate-800">{pendiente.nombreMio}</h2>
                  <p className="text-sm text-gray-600 mb-2">Esperando aceptación</p>
                </div>
              ))}
            </div>
          )}


          {/* 🟢 Lista de amigos aceptados */}
          <h2 className="text-xl font-semibold mb-4">Tus amigos</h2>
          {amigos.length === 0 ? (
            <p className="text-center text-gray-500">Aún no tienes amigos agregados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amigos.map((amigo) => (
                <div
                  key={amigo.amigoId}
                  className="bg-white shadow rounded-xl p-6 flex flex-col justify-between border-l-4 border-green-400"
                >
                  <h2 className="text-xl font-bold text-slate-800">{amigo.nombreAmigo}</h2>
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
