"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/mundos", label: "Mundos" },
  { href: "/dashboard/progreso", label: "Progreso" },
  { href: "/dashboard/logros", label: "Logros" },
  { href: "/dashboard/amigos", label: "Amigos" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(true);

  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Botón hamburguesa para mobile */}
      <button
        className="absolute top-4 left-4 md:hidden z-30 bg-slate-800 text-white p-2 rounded-md"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <Menu />
      </button>

      {/* Sidebar fijo */}
      {menuVisible && (
        <aside className="fixed top-0 left-0 w-64 h-screen overflow-y-auto bg-slate-800 text-white flex flex-col p-6 space-y-6 z-20">
          <h2 className="text-2xl font-bold">🧠 CodeQuest</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded ${pathname === item.href
                    ? "bg-green-500 text-white font-semibold"
                    : "hover:bg-slate-700"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <button onClick={handleLogout} className="text-red-500 hover:underline">
              Cerrar sesión
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
