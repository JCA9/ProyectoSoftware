"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario]);

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
