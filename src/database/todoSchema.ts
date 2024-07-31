import { uuid, text, boolean, pgTable, foreignKey } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { userSchema } from "./userSchema";

const todoSchema = pgTable("todoTasks", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    task: text("task").notNull(),
    completed: boolean("completed").default(false).notNull(),
    userId: uuid("userId").references(() => userSchema.id).notNull(),
});

export { todoSchema };
