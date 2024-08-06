import { uuid, text, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { relations } from 'drizzle-orm';


const todos = pgTable("todoTasks", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    task: text("task").notNull(),
    completed: boolean("completed").default(false).notNull(),
    inProgress: boolean('inProgress').default(false).notNull(),
    userEmail: text('userEmail').notNull()
});

// const users = pgTable("users", {
//     id: uuid("id").default(uuidv4()).primaryKey(),
//     email: text('email'),
//     password: text('password'),
//     userEmail: text('userEmail').notNull()
// });


// const users = pgTable("users", {
//     id: uuid("id").default(uuidv4()).primaryKey(),
//     email: text('email'),
//     password: text('password')
// });

// const todos = pgTable("todoTasks", {
//     id: uuid("id").default(uuidv4()).primaryKey(),
//     task: text("task").notNull(),
//     completed: boolean("completed").default(false).notNull(),
//     inProgress: boolean('inProgress').default(false).notNull(),
//     userId: uuid('userId').notNull().references(() => users.id)
// });
//
// const sessions = pgTable('sessions', {
//    id: uuid('id').default(uuidv4()).primaryKey(),
//    sessionToken: text('sessionToken').unique().notNull(),
//    userId: uuid('userId').notNull().references(() => users.id),
//    expires: timestamp('expires', { precision: 3 }).notNull()
// });
//
// const usersRelations = relations(users, ({ many }) => ({
//     todos: many(todos),
//     sessions: many(sessions)
// }));
//
// const todosRelations = relations(todos, ({ one }) => ({
//     user: one(users, {
//         fields: [todos.userId],
//         references: [users.id]
//     })
// }));
//
// const sessionsRelations = relations(sessions, ({ one }) => ({
//     user: one(users, {
//         fields: [sessions.userId],
//         references: [users.id]
//     })
// }));

// export { users, todos, sessions };

export { todos };
