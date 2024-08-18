export interface TodoFunctions {
    changeTodoTask: (id: string, task: string) => Promise<void>;
    changeTodoCompleted: (id: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    editTodo: (id: string, newTask: string) => Promise<void>;
    startTodo: (id: string) => Promise<void>;
    changeTodoInProgress: (id: string, inProgress: boolean) => Promise<void>;
}
