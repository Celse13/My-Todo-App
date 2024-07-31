import { NextApiRequest, NextApiResponse} from "next";
import { getTodos, createTodo, deleteTodo, editTodo } from "@/actions/todoActions";

export default async  function handler (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case  "GET":
            const todos = await getTodos();
            res.status(200).json(todos);
            break;
        case "POST":
            const { task } = req.body;
            const newTodo = await createTodo(task);
            res.status(201).json(newTodo);
            break;
        case "DELETE":
            const { id } = req.body;
            await deleteTodo(id as string);
            res.status(204).end();
            break;
        case "PUT":
            const { id: editId, updates } = req.body;
            await editTodo(editId, updates);
            res.status(200).end();
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
            res.status(405).end(`Method ${req.method} not Allowed`);
    }
}
