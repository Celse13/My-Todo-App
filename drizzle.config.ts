import dotenv from 'dotenv';
import { defineConfig  } from 'drizzle-kit';

dotenv.config({ path: ".env.local" });

// Define the configuration for Drizzle
export default defineConfig ({
    schema: './database/schema.ts',
    out: './src/generated',
    dialect: 'postgres',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});

