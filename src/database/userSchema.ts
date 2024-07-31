import { uuid, text, pgTable } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

const userSchema = pgTable("users", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});

export { userSchema };
