
-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(150) UNIQUE NOT NULL,
  contrasena_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mundos
CREATE TABLE mundos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  orden INT NOT NULL,
  icono_url VARCHAR(255)
);

-- Tabla de lecciones
CREATE TABLE lecciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_mundo INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  orden INT NOT NULL,
  FOREIGN KEY (id_mundo) REFERENCES mundos(id)
);

-- Tabla de progreso por usuario
CREATE TABLE progreso_usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_leccion INT NOT NULL,
  completado BOOLEAN DEFAULT FALSE,
  fecha_completado DATETIME,
  puntuacion INT DEFAULT 0,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_leccion) REFERENCES lecciones(id),
  UNIQUE (id_usuario, id_leccion)
);

-- Tabla de amigos (con control de duplicados cruzados)
CREATE TABLE amigos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario1 INT NOT NULL,
  id_usuario2 INT NOT NULL,
  estado ENUM('pendiente', 'aceptado', 'rechazado') DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario1) REFERENCES usuarios(id),
  FOREIGN KEY (id_usuario2) REFERENCES usuarios(id),
  UNIQUE (LEAST(id_usuario1, id_usuario2), GREATEST(id_usuario1, id_usuario2))
);

-- Tabla de logros
CREATE TABLE logros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  icono_url VARCHAR(255)
);

-- Tabla de logros obtenidos por usuarios
CREATE TABLE logros_usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_logro INT NOT NULL,
  fecha_desbloqueo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_logro) REFERENCES logros(id),
  UNIQUE (id_usuario, id_logro)
);

-- Tabla de posts (hilos de la pantalla de inicio)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla de respuestas a los posts
CREATE TABLE respuestas_post (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_post INT NOT NULL,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_post) REFERENCES posts(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN DEFAULT FALSE,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla de historial de progreso (para analítica futura)
CREATE TABLE historial_progreso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_leccion INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_leccion) REFERENCES lecciones(id)
);
