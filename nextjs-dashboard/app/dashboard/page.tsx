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
      <div className="flex min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <Sidebar />
        <main className="flex-1 px-6 py-8 md:px-16 md:py-12 md:ml-64 w-full">
          <h1 className="text-5xl font-extrabold text-white mb-10 flex items-center gap-4">
             Inicio
          </h1>

          <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 mb-12 border border-white/20 transition-all hover:shadow-3xl">
            <form onSubmit={handleCrearPost} className="flex flex-col space-y-6">
              <textarea
                placeholder="💭 ¿En qué estás pensando?"
                className="w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400/70 transition"
                value={nuevoPost}
                onChange={(e) => setNuevoPost(e.target.value)}
                rows={4}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-extrabold py-3 px-8 rounded-2xl self-end transition-transform hover:scale-110 shadow-lg"
              >
                Publicar
              </button>
            </form>
          </div>

          {loading ? (
            <div className="text-center text-white text-xl animate-pulse">
              🔄 Cargando publicaciones...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-white/80 text-xl">
              💤 No hay publicaciones todavía, ¡sé el primero en escribir algo!
            </div>
          ) : (
            <div className="space-y-8">
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
