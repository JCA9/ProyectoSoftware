// lib/api/api.ts

const BASE_URL = "http://localhost:3000/api";

// 🔹 GET Feed de amigos
export async function getFeed(usuarioId: number) {
  const res = await fetch(`${BASE_URL}/feed/${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener el feed");
  return await res.json();
}

// 🔹 GET Progreso Global
export async function getProgresoGlobal(usuarioId: number) {
  const res = await fetch(`${BASE_URL}/progreso-global/${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener progreso global");
  return await res.json();
}

// 🔹 GET Logros
export async function getLogros(usuarioId: number) {
  const res = await fetch(`${BASE_URL}/logros/${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener logros");
  return await res.json();
}

// 🔹 GET Amigos
export async function getAmigos(usuarioId: number) {
  const res = await fetch(`${BASE_URL}/amigos/${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener lista de amigos");
  return await res.json();
}

// 🔹 POST Enviar solicitud de amistad
export async function enviarSolicitudAmistad(idUsuarioSolicitante: number, idUsuarioReceptor: number) {
  const res = await fetch(`${BASE_URL}/amigos/solicitar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuarioSolicitante,
      idUsuarioReceptor,
    }),
  });
  if (!res.ok) throw new Error("Error al enviar solicitud de amistad");
  return await res.json();
}

// 🔹 POST Aceptar/Rechazar solicitud
export async function actualizarSolicitudAmistad(idUsuarioSolicitante: number, idUsuarioReceptor: number, nuevoEstado: 'aceptado' | 'rechazado') {
  const res = await fetch(`${BASE_URL}/amigos/actualizar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuarioSolicitante,
      idUsuarioReceptor,
      nuevoEstado,
    }),
  });
  if (!res.ok) throw new Error("Error al actualizar estado de amistad");
  return await res.json();
}

// 🔹 POST Crear nuevo post
export async function crearPost(idUsuario: number, contenido: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuario,
      contenido,
    }),
  });
  if (!res.ok) throw new Error("Error al crear post");
  return await res.json();
}

// 🔹 GET Leer hilo completo (post + respuestas)
export async function getPostConRespuestas(postId: number) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Error al obtener hilo");
  return await res.json();
}

// 🔹 POST Responder a un post
export async function responderPost(idUsuario: number, idPost: number, contenido: string) {
  const res = await fetch(`${BASE_URL}/respuestas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuario,
      idPost,
      contenido,
    }),
  });
  if (!res.ok) throw new Error("Error al responder post");
  return await res.json();
}

// 🔹 POST Registrar progreso de lección
export async function registrarProgreso(idUsuario: number, idLeccion: number, puntuacion: number) {
  const res = await fetch(`${BASE_URL}/progreso`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuario,
      idLeccion,
      puntuacion,
      completado: true
    }),
  });
  if (!res.ok) throw new Error("Error al registrar progreso");
  return await res.json();
}

// Registrar nuevo usuario
export async function registrarUsuario(nombre: string, correo: string, contrasena: string) {
  const res = await fetch(`${BASE_URL}/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, contrasena }),
  });
  if (!res.ok) throw new Error("Error al registrar usuario");
  return await res.json();
}

// Loguear usuario
export async function loginUsuario(correo: string, contrasena: string) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  if (!res.ok) throw new Error("Correo o contraseña inválidos");
  return await res.json();  // aquí devuelve el usuario completo
}

// 🔹 GET Mundos
export async function getMundos() {
  const res = await fetch(`${BASE_URL}/mundos`);
  if (!res.ok) throw new Error("Error al obtener mundos");
  return await res.json();
}

// 🔹 GET Lecciones por mundo
export async function getLeccionesPorMundo(mundoId: number) {
  const res = await fetch(`${BASE_URL}/mundos/${mundoId}/lecciones`);
  if (!res.ok) throw new Error("Error al obtener lecciones");
  return await res.json();
}

// 🔹 GET Detalle de lección
export async function getLeccion(idLeccion: number) {
  const res = await fetch(`${BASE_URL}/lecciones/${idLeccion}`);
  if (!res.ok) throw new Error(`Error al obtener lección (ID ${idLeccion})`);
  return await res.json();
}


