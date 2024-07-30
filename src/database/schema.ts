
import { uuid, text, boolean, pgTable } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";


const todoSchema = pgTable("todoTasks", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    task: text("task").notNull(),
    completed: boolean("completed").default(false).notNull(),
});

export { todoSchema };
