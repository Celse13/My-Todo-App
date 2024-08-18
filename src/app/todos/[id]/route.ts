import { deleteTodo, getTodoById, editTodo} from "@/actions/todoActions";

import { NextRequest, NextResponse } from 'next/server';


export const GET = async (req: NextRequest, { params }: {params: {id: string }}) => {
    const todo = await getTodoById(params.id);
    if (!todo) {
        return NextResponse.json({ message: "todo not found" }, { status: 404 });
    } else {
        return NextResponse.json({ message: "todo found", data: todo });
    }
}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { task }: { task: string } = await req.json();
    const returnedTodo = await editTodo(params.id, task);
    return NextResponse.json(
        {
            message: "Todo updated successfully",
            data: returnedTodo,
        },
        { status: 201 }
    );
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const todo = await getTodoById(params.id);
    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    const response = await deleteTodo(params.id);
    return NextResponse.json({
        message: "Todo deleted successfully",
        data: response,
    });
}

