import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';

dotenv.config();

const connection = neon(process.env.NEON_DATABASE_URL!);

const db = drizzle(connection);

export default db;
