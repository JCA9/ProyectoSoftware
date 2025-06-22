"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Interface para el usuario
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  avatarUrl?: string | null;
}

// Contexto
interface UserContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);

  // Al cargar, intentamos recuperar usuario de localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuarioState(JSON.parse(storedUser));
    }
  }, []);

  function setUsuario(usuario: Usuario) {
    setUsuarioState(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  function logout() {
    setUsuarioState(null);
    localStorage.removeItem("usuario");
  }

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para consumir el contexto
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro de UserProvider");
  }
  return context;
}
