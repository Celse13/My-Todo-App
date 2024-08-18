import Todo from "@/components/Todo";
import { todoType } from "@/types/todoType";
import { fetchTodos } from "@/components/hooks/TodoQueries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

interface TodoListProps {
  changeTodoTask: (id: string, task: string) => void;
  changeTodoCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTask: string) => void;
  startTodo: (id: string) => void;
  changeTodoInProgress: (id: string, inProgress: boolean) => void;
}

const TodoList = ({
  changeTodoTask,
  changeTodoCompleted,
  deleteTodo,
  editTodo,
  startTodo,
  changeTodoInProgress,
}: TodoListProps) => {
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner loading={true} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading todos</div>;
  }

  return (
    <div className="todo-list">
      {todos?.map((todo: todoType) => (
        <div key={todo.id} className="todo-item">
          <Todo
            todo={todo}
            changeTodoTask={changeTodoTask}
            changeTodoCompleted={changeTodoCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            startTodo={startTodo}
            changeTodoInProgress={changeTodoInProgress}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
