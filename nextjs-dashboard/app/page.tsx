"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Sección Hero */}
      <section
        id="inicio"
        className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      >
        {/* Navbar fijo superior */}
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-green-600 text-2xl font-bold">
            🧠 CodeQuest
          </div>

          {/* Botón */}
          <Link href="/registro">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
              Empieza Ahora
            </button>
          </Link>
        </div>



        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl w-full">
          {/* Imagen ilustrativa */}
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
            <Image
              src="/hero-desktop.png"
              alt="CodeQuest personajes"
              fill
              className="object-contain"
            />
          </div>

          {/* Texto y botones */}
          <div className="flex flex-col items-center md:items-start max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              ¡Aprende a programar de forma divertida y efectiva!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              CodeQuest es la plataforma que te enseña programación paso a paso con ejercicios prácticos, retos y recompensas.
            </p>

            <div className="flex gap-4 w-full justify-center md:justify-start">
              <Link href="/registro">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md">
                  EMPIEZA AHORA
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl border">
                  YA TENGO UNA CUENTA
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lenguajes disponibles */}
      <section className="w-full py-8 bg-gray-100 flex flex-wrap justify-center items-center gap-6">
        {["Python", "JavaScript", "C++", "Java", "HTML", "SQL"].map((lang) => (
          <span
            key={lang}
            className="text-md font-medium text-gray-700 hover:underline cursor-pointer"
          >
            {lang}
          </span>
        ))}
      </section>

      {/* Sección 1: divertido, práctico y gratuito */}
      <section
        id="ventajas"
        className="w-full py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            divertido, práctico y gratuito
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Aprender a programar nunca fue tan divertido. En CodeQuest, cada lección te reta con ejercicios interactivos que desbloquean nuevas misiones y habilidades.
            <span className="text-blue-600 font-semibold"> Los datos muestran que practicar de forma constante con mini-retos mejora la retención hasta 80%.</span>
            ¡Comienza a construir tu conocimiento desde el primer día!
          </p>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/codificando-divertido.png"
            alt="Ilustración divertida de CodeQuest"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Sección 2: respaldado por la ciencia */}
      <section
        id="ciencia"
        className="w-full bg-white-50 py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/respaldo-ciencia.png"
            alt="Respaldado por ciencia"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            respaldado por la ciencia
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CodeQuest combina métodos probados de enseñanza con teorías modernas del aprendizaje activo. Nuestro contenido es interactivo, basado en evidencia y diseñado para mantenerte motivado mientras desarrollas habilidades técnicas reales.
          </p>
        </div>
      </section>

      {/* Sección 1: divertido, práctico y gratuito */}
      <section
        id="ventajas"
        className="w-full py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            divertido, práctico y gratuito
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Aprender a programar nunca fue tan divertido. En CodeQuest, cada lección te reta con ejercicios interactivos que desbloquean nuevas misiones y habilidades.
            <span className="text-blue-600 font-semibold"> Los datos muestran que practicar de forma constante con mini-retos mejora la retención hasta 80%.</span>
            ¡Comienza a construir tu conocimiento desde el primer día!
          </p>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/codificando-divertido.png"
            alt="Ilustración divertida de CodeQuest"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Sección 2: respaldado por la ciencia */}
      <section
        id="ciencia"
        className="w-full bg-white-50 py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/respaldo-ciencia.png"
            alt="Respaldado por ciencia"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            respaldado por la ciencia
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CodeQuest combina métodos probados de enseñanza con teorías modernas del aprendizaje activo. Nuestro contenido es interactivo, basado en evidencia y diseñado para mantenerte motivado mientras desarrollas habilidades técnicas reales.
          </p>
        </div>
      </section>

      {/* Sección 2: respaldado por la ciencia */}
      <section
        id="ciencia"
        className="w-full bg-gray-700 py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/respaldo-ciencia.png"
            alt="Respaldado por ciencia"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            respaldado por la ciencia
          </h2>
          <p className="text-white-50 text-lg leading-relaxed">
            CodeQuest combina métodos probados de enseñanza con teorías modernas del aprendizaje activo. Nuestro contenido es interactivo, basado en evidencia y diseñado para mantenerte motivado mientras desarrollas habilidades técnicas reales.
          </p>
        </div>
      </section>

            {/* Sección 1: divertido, práctico y gratuito */}
      <section
        id="ventajas"
        className="w-full py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            divertido, práctico y gratuito
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Aprender a programar nunca fue tan divertido. En CodeQuest, cada lección te reta con ejercicios interactivos que desbloquean nuevas misiones y habilidades.
            <span className="text-blue-600 font-semibold"> Los datos muestran que practicar de forma constante con mini-retos mejora la retención hasta 80%.</span>
            ¡Comienza a construir tu conocimiento desde el primer día!
          </p>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/codificando-divertido.png"
            alt="Ilustración divertida de CodeQuest"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Sección 2: respaldado por la ciencia */}
      <section
        id="ciencia"
        className="w-full bg-white-50 py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <img
            src="/publicaciones/respaldo-ciencia.png"
            alt="Respaldado por ciencia"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            respaldado por la ciencia
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CodeQuest combina métodos probados de enseñanza con teorías modernas del aprendizaje activo. Nuestro contenido es interactivo, basado en evidencia y diseñado para mantenerte motivado mientras desarrollas habilidades técnicas reales.
          </p>
        </div>
      </section>

      {/* Footer estilo Duolingo */}
      <footer className="bg-lime-500 text-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">

          {/* Sobre nosotros */}
          <div>
            <h3 className="font-bold mb-2">Sobre nosotros</h3>
            <ul className="space-y-1">
              {["Cursos", "Misión", "Método de enseñanza", "Eficacia", "Manual de CodeQuest", "Empleo", "Prensa", "Contáctanos"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-bold mb-2">Productos</h3>
            <ul className="space-y-1">
              {["CodeQuest", "CodeQuest Junior", "Podcast", "CodeQuest para empresas"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Aplicaciones */}
          <div>
            <h3 className="font-bold mb-2">Aplicaciones</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Android</a></li>
              <li><a href="#" className="hover:underline">iOS</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-bold mb-2">Ayuda y soporte</h3>
            <ul className="space-y-1">
              {["FAQ", "Soporte Técnico", "Estado del servicio"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-2">Términos y privacidad</h3>
            <ul className="space-y-1">
              {["Normas de la comunidad", "Términos", "Privacidad"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-2">Social</h3>
            <ul className="space-y-1">
              {["Blog", "Instagram", "TikTok", "Twitter", "YouTube"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>



    </main>
  );
}
