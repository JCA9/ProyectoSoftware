// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext"; 

export const metadata: Metadata = {
  title: "CodeQuest – Aprende Programación Jugando",
  description: "La forma divertida, efectiva y gratis de aprender a programar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 font-sans">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
