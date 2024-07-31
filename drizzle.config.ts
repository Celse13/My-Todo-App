// import dotenv from "dotenv";
// import { defineConfig } from "drizzle-kit";
//
// dotenv.config({ path: ".env.local" });
//
// export default defineConfig({
//     schema: "./src/database/todoSchema.ts",
//     out: "./src/generated",
//     dialect: "postgresql",
//     dbCredentials: {
//         url: process.env.DATABASE_URL!,
//     },
// });



import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({ path: ".env.local" });

const DATABASE_URL=process.env.DATABASE_URL || ""

export default defineConfig({
    schema: ["./src/database/todoSchema.ts", "./src/database/userSchema.ts"],
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: DATABASE_URL,
    },
});
