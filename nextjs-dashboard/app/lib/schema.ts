import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  int,
  boolean,
  text,
  mysqlEnum,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';


// Tabla usuarios
export const usuarios = mysqlTable('usuarios', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 100 }),
  correo: varchar('correo', { length: 150 }).unique().notNull(),
  contrasenaHash: varchar('contrasena_hash', { length: 255 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  fechaRegistro: timestamp('fecha_registro').defaultNow(),
});

export const logros = mysqlTable('logros', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 100 }).notNull(),
  descripcion: text('descripcion'),
  iconoUrl: varchar('icono_url', { length: 255 }),
});

export const mundos = mysqlTable('mundos', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  descripcion: text('descripcion'),
  orden: int('orden').notNull(),
  iconoUrl: varchar('icono_url', { length: 255 }),
});

// Tabla progreso_usuarios
export const progresoUsuarios = mysqlTable('progreso_usuarios', {
  id: serial('id').primaryKey(),
  idUsuario: int('id_usuario').notNull(),
  idLeccion: int('id_leccion').notNull(),
  completado: boolean('completado').default(false),
  fechaCompletado: timestamp('fecha_completado'),
  puntuacion: int('puntuacion').default(0),
}, (table) => ({
  uniqueUsuarioLeccion: uniqueIndex('unique_usuario_leccion').on(table.idUsuario, table.idLeccion),
}));

// Tabla amigos
export const amigos = mysqlTable('amigos', {
  id: serial('id').primaryKey(),
  idUsuario1: int('id_usuario1').notNull(),
  idUsuario2: int('id_usuario2').notNull(),
  estado: mysqlEnum('estado', ['pendiente', 'aceptado', 'rechazado']).default('pendiente'),
  fechaSolicitud: timestamp('fecha_solicitud').defaultNow(),
}, (table) => ({
  uniqueAmigos: uniqueIndex('unique_amigos').on(table.idUsuario1, table.idUsuario2),
}));



// Tabla logros_usuarios
export const logrosUsuarios = mysqlTable('logros_usuarios', {
  id: serial('id').primaryKey(),
  idUsuario: int('id_usuario').notNull(),
  idLogro: int('id_logro').notNull(),
  fechaDesbloqueo: timestamp('fecha_desbloqueo').defaultNow(),
}, (table) => ({
  uniqueLogroUsuario: uniqueIndex('unique_logro_usuario').on(table.idUsuario, table.idLogro),
}));

// Tabla posts
export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  idUsuario: int('id_usuario').notNull(),
  contenido: text('contenido').notNull(),
  fechaCreacion: timestamp('fecha_creacion').defaultNow(),
});

// Tabla respuestas_post
export const respuestasPost = mysqlTable('respuestas_post', {
  id: serial('id').primaryKey(),
  idPost: int('id_post').notNull(),
  idUsuario: int('id_usuario').notNull(),
  contenido: text('contenido').notNull(),
  fechaRespuesta: timestamp('fecha_respuesta').defaultNow(),
});

// Tabla notificaciones
export const notificaciones = mysqlTable('notificaciones', {
  id: serial('id').primaryKey(),
  idUsuario: int('id_usuario').notNull(),
  mensaje: text('mensaje').notNull(),
  leida: boolean('leida').default(false),
  fecha: timestamp('fecha').defaultNow(),
});

// Tabla historial_progreso
export const historialProgreso = mysqlTable('historial_progreso', {
  id: serial('id').primaryKey(),
  idUsuario: int('id_usuario').notNull(),
  idLeccion: int('id_leccion').notNull(),
  fecha: timestamp('fecha').defaultNow(),
});

export const lecciones = mysqlTable("lecciones", {
  id: serial("id").primaryKey(),
  idMundo: int("id_mundo").notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  tipoPregunta: varchar("tipoPregunta", { length: 50 }).notNull(),
  orden: int("orden").notNull(),
});



export const preguntas = mysqlTable("preguntas", {
  id: serial("id").primaryKey(),
  idLeccion: int("idLeccion").notNull().references(() => lecciones.id),
  enunciado: text("enunciado").notNull(),
});

export const opciones = mysqlTable("opciones", {
  id: serial("id").primaryKey(),
  idPregunta: int("idPregunta").notNull().references(() => preguntas.id),
  textoOpcion: text("textoOpcion").notNull(),
  esCorrecta: boolean("esCorrecta").notNull().default(false),
});
