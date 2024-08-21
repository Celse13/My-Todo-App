import {deleteTodo, getTodoId, toggleTodoCompletedStatus, updateTodo, } from "@/actions/todoActions";

import { NextRequest, NextResponse } from 'next/server';

import {auth} from "../../../../../auth";
import { redirect } from 'next/navigation';

export const DELETE = async ( req: NextRequest, { params }: { params: { id: number } }
) => {
    try {
        const session = await auth();
        if (!session?.user.id) {
            return NextResponse.json({
                message: 'Unauthorized'
            })
        }
        const todoId = Number(params.id);
        const todo = await getTodoId(todoId);
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }
        await deleteTodo(todoId);
        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}


export const PATCH = async ( req: NextRequest, { params }: { params: { id: string } }
) => {
    const todoId = Number(params.id);
    const todo = await getTodoId(todoId);

    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const { task } = await req.json();
    if (!task) {
        return NextResponse.json(
            { message: "No values to update" },
            { status: 400 }
        );
    }

    await updateTodo(todoId, task);
    return NextResponse.json({ message: "Todo updated successfully" });
}

export const PUT = async ( req: NextRequest, { params }: { params: { id: string } }
) =>{
    const todoId = Number(params.id);
    const todo = await getTodoId(todoId);
    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await toggleTodoCompletedStatus(todoId);
    return NextResponse.json({ message: "Todo toggled successfully" });
}
