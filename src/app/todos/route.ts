import { createTodo, getTodos } from "@/actions/todoActions";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "../../../auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    const todos = await getTodos(session?.user?.id!);
    return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    const { task }: { task: string } = await req.json();
    const data = await createTodo(task, session?.user?.id!);
    return NextResponse.json({ message: "Task created successfully", data: data });
}


