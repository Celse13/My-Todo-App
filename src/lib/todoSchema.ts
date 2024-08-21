import { z } from "zod";

export const todoSchema = z.object({
    task: z.string().min(4, "Task must have 4 characters or more")
        .max(10, "Task must not exceed 10 characters"),
});

export type TodoSchema = z.infer<typeof todoSchema>;
