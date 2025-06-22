import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Conexión MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  connectionLimit: 10,
});

// Conexión Drizzle
export const db = drizzle(pool);
