"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/mundos", label: " Mundos" },
  { href: "/dashboard/progreso", label: "Progreso" },
  { href: "/dashboard/logros", label: "Logros" },
  { href: "/dashboard/amigos", label: "Amigos" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(true);

  const { logout } = useUser();
  const router = useRouter();

  const hideSidebar = pathname.startsWith("/dashboard/mundo/");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {menuVisible && !hideSidebar && (
        <aside className="fixed top-0 left-0 w-64 h-screen overflow-y-auto bg-gradient-to-b from-[#141e30] to-[#243b55] text-white flex flex-col p-6 space-y-6 shadow-2xl z-20 border-r border-white/10">
          <h2 className="text-3xl font-extrabold flex items-center gap-2">
            <span className="text-pink-400 animate-pulse">🧠</span> CodeQuest
          </h2>
          <nav className="flex flex-col gap-2 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl transition-all duration-300 text-lg tracking-wide ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md scale-105"
                    : "hover:bg-white/10 hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-600 transition-colors duration-200 font-medium"
            >
             Cerrar sesión
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
