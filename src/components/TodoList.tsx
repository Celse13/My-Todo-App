import React from "react";
import Todo from "@/components/Todo";
import { todoType } from "@/types/todoType";

interface TodoListProps {
  todos: todoType[];
  changeTodoTask: (id: string, task: string) => void;
  changeTodoCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTask: string) => void;
  startTodo: (id: string) => void;
}

const TodoList = ({
  todos = [],
  changeTodoTask,
  changeTodoCompleted,
  deleteTodo,
  editTodo,
  startTodo
}: TodoListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <Todo
            todo={todo}
            changeTodoTask={changeTodoTask}
            changeTodoCompleted={changeTodoCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            startTodo={startTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
