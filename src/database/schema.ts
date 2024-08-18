import { uuid, text, pgTable, boolean, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { relations } from 'drizzle-orm';
import type { AdapterAccountType } from "next-auth/adapters";



const users = pgTable("users", {
    id: uuid("id").default(uuidv4()).primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: boolean("emailVerified"),
    image: text("image"),
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

const accounts = pgTable(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);


const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        id: uuid("id")
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
            columns: [authenticator.id, authenticator.credentialID],
        }),
    })
);


export { users, todos, sessions, authenticators, accounts, usersRelations, todosRelations, sessionsRelations };

