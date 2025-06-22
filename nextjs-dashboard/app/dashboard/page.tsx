"use client";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getFeed, crearPost } from "../lib/api/api";
import PostItem from "../components/PostItem";

interface Post {
  id: number;
  nombreUsuario: string;
  contenido: string;
  fechaCreacion: string;
}

export default function DashboardInicio() {
  const { usuario } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoPost, setNuevoPost] = useState("");

  useEffect(() => {
    if (!usuario) return;
    cargarFeed();
  }, [usuario]);

  async function cargarFeed() {
    setLoading(true);
    try {
      const data = await getFeed(usuario!.id);
      setPosts(data);
    } catch (error) {
      console.error("Error al cargar feed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCrearPost(e: React.FormEvent) {
    e.preventDefault();
    if (!nuevoPost.trim()) return;

    try {
      await crearPost(usuario!.id, nuevoPost.trim());
      setNuevoPost("");
      await cargarFeed();
    } catch (error) {
      console.error("Error al crear post:", error);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 bg-slate-50 px-4 py-6 md:px-10 md:py-8 md:ml-64 w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Inicio</h1>

          <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-slate-200">
            <form onSubmit={handleCrearPost} className="flex flex-col space-y-4">
              <textarea
                placeholder="Escribe una nueva publicación..."
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={nuevoPost}
                onChange={(e) => setNuevoPost(e.target.value)}
                rows={3}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md self-end"
              >
                Publicar
              </button>
            </form>
          </div>

          {loading ? (
            <p className="text-center">Cargando publicaciones...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-600">Aún no hay publicaciones de tus amigos.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  postId={post.id}
                  nombreUsuario={post.nombreUsuario}
                  contenido={post.contenido}
                  fechaCreacion={post.fechaCreacion}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
