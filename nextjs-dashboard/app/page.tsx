"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">

      {/* Navbar fijo superior */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#0f2027]/80 to-transparent z-50 px-10 py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <div className="text-3xl font-extrabold flex items-center gap-2">
          <span className="text-pink-400 animate-pulse">🧠</span> CodeQuest
        </div>

        <Link href="/registro">
          <button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-500 hover:to-green-700 WHITE-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105">
            Empieza Ahora
          </button>
        </Link>
      </div>

      {/* Hero */}
      <section id="inicio" className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-0 animate-float">
          <Image src="/Programando2.png" alt="CodeQuest personajes" width={400} height={400} className="object-contain drop-shadow-lg" />
        </div>

        <div className="relative z-10 mt-36 md:mt-44 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-6">¡Aprende a programar de forma divertida y efectiva!</h1>
          <p className="text-xl mb-8 text-white/80">
            CodeQuest te enseña programación paso a paso con ejercicios interactivos, retos y logros desbloqueables.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/registro">
              <button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-500 hover:to-green-700 WHITE-black font-extrabold py-4 px-10 rounded-xl shadow-xl text-lg transition-transform hover:scale-110">
                EMPIEZA AHORA
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-white text-black font-bold py-4 px-10 rounded-xl shadow-xl border transition-transform hover:scale-105">
                YA TENGO CUENTA
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lenguajes */}
      <section className="w-full py-12 bg-white text-gray-800 flex flex-wrap justify-center items-center gap-8">
        {[
          { name: "Python", src: "/logos/python.png", disponible: true },
          { name: "JavaScript", src: "/logos/javascript.png", disponible: true },
          { name: "C++", src: "/logos/cpp.png", disponible: true },
          { name: "Java", src: "/logos/java.png", disponible: true },
          { name: "HTML", src: "/logos/html.png", disponible: true },
          { name: "SQL", src: "/logos/sql.png", disponible: true },
        ].map((lang) => (
          <div
            key={lang.name}
            className={`flex flex-col items-center transition duration-300 ease-in-out transform ${lang.disponible ? "hover:-translate-y-3 hover:scale-125 cursor-pointer" : "opacity-60"}`}
          >
            <div className="w-24 h-24 relative">
              <Image
                src={lang.src}
                alt={lang.name}
                fill
                className={`object-contain ${!lang.disponible ? "grayscale" : ""}`}
              />
            </div>
            <span className="text-lg font-semibold mt-2">{lang.name} {!lang.disponible && <span className="text-sm text-gray-500">(Próximamente)</span>}</span>
          </div>
        ))}
      </section>



      {/* Ventajas */}
      <section id="ventajas" className="w-full py-24 px-6 flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-green-400 mb-6">Divertido, práctico y gratuito</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Aprender a programar nunca fue tan divertido. Desbloquea misiones, completa retos interactivos, y mejora hasta un <span className="text-blue-300 font-bold">80% tu retención</span> practicando de forma activa.
          </p>
        </div>
        <div className="w-72 h-72 md:w-96 md:h-96 relative">
          <Image src="/amigos.png" alt="Ilustración divertida" fill className="object-contain" />
        </div>
      </section>

      {/* Ciencia */}
      <section id="ciencia" className="w-full py-24 px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-16 bg-white text-black">
        <div className="w-72 h-72 md:w-96 md:h-96 relative">
          <Image src="/Ciencia.png" alt="Respaldado por ciencia" fill className="object-contain" />
        </div>
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-green-600 mb-6">Respaldado por la ciencia</h2>
          <p className="text-lg leading-relaxed">
            Combinamos métodos pedagógicos probados y ciencia del aprendizaje activo. CodeQuest mantiene tu motivación mientras adquieres habilidades técnicas reales.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lime-500 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-2">Sobre nosotros</h3>
            <ul className="space-y-1">
              {["Cursos", "Misión", "Empleo", "Contáctanos"].map((item) => (
                <li key={item}><a href="#" className="hover:underline">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Productos</h3>
            <ul className="space-y-1">
              {["CodeQuest", "Podcast", "Empresas"].map((item) => (
                <li key={item}><a href="#" className="hover:underline">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Aplicaciones</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Android</a></li>
              <li><a href="#" className="hover:underline">iOS</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Soporte</h3>
            <ul className="space-y-1">
              {["FAQ", "Soporte Técnico", "Estado del servicio"].map((item) => (
                <li key={item}><a href="#" className="hover:underline">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="space-y-1">
              {["Normas", "Términos", "Privacidad"].map((item) => (
                <li key={item}><a href="#" className="hover:underline">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Social</h3>
            <ul className="space-y-1">
              {["Instagram", "TikTok", "YouTube"].map((item) => (
                <li key={item}><a href="#" className="hover:underline">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -20px); }
        }
      `}</style>
    </main>
  );
}
