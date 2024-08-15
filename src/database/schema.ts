import { uuid, text, pgTable, boolean, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { relations } from 'drizzle-orm';





const users = pgTable("users", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: boolean("emailVerified"),
    image: text("image"),
    role: text("role"),
});

const todos = pgTable("todoTasks", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    task: text("task").notNull(),
    completed: boolean("completed").default(false).notNull(),
    inProgress: boolean('inProgress').default(false).notNull(),
    userId: uuid('userId').notNull().references(() => users.id)
});

const sessions = pgTable('sessions', {
   id: uuid('id').default(uuidv4()).primaryKey(),
   sessionToken: text('sessionToken').unique().notNull(),
   userId: uuid('userId').notNull().references(() => users.id),
   expires: timestamp('expires', { precision: 3 }).notNull()
});

const usersRelations = relations(users, ({ many }) => ({
    todos: many(todos),
    sessions: many(sessions)
}));

const todosRelations = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.userId],
        references: [users.id]
    })
}));

const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id]
    })
}));


const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
);


export { users, todos, sessions, authenticators };

