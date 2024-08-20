import { createTodo, getTodos } from "@/actions/todoActions";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "../../../../auth";

export async function GET(req: NextRequest) {
    const session:any = await auth()
    const todos = await getTodos(session?.user.id);
    return NextResponse.json({
        status: 200,
        todos:todos,
    });
}

export async function POST(req: NextRequest)
{
    const { task }: { task: string } = await req.json();
    await createTodo(task);
    return NextResponse.json({
        status: 201,
        message: "Todo added successfully",
    });

}
