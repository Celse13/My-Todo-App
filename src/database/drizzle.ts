import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import "dotenv/config"
const DATABASE_URL=process.env.DATABASE_URL || ""
const sql = neon(DATABASE_URL);

const db = drizzle(sql);

export default db;
