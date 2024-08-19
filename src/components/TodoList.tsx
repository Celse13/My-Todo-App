import Todo from "@/components/Todo";
import { todoType } from "@/types/todoType";
import { fetchTodos } from "@/components/hooks/TodoQueries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { TodoFunctions } from "@/types/todoFunctions";

interface TodoListProps extends TodoFunctions {}

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
            {Array.isArray(todos) && todos.length > 0 ? (
                todos.map((todo: todoType) => (
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
                ))
            ) : (
                <div>No tasks to display</div>
            )}
        </div>
    );
};

export default TodoList;
