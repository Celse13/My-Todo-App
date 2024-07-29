// src/components/TodoList.tsx
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Todo from "@/components/Todo";
import { FaPlay, FaTrash } from "react-icons/fa";

const TodoList = ({ todos, changeTodoTask, changeTodoCompleted, deleteTodo, editTodo, startTodo, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="todo-item">
                                        <Todo
                                            todo={todo}
                                            changeTodoTask={changeTodoTask}
                                            changeTodoCompleted={changeTodoCompleted}
                                            deleteTodo={deleteTodo}
                                            editTodo={editTodo}
                                            startTodo={startTodo}
                                        />
                                        <div className="todo-controls">
                                            <button className="todo-button todo-start" onClick={() => startTodo(todo.id)}>
                                                <FaPlay />
                                            </button>
                                            <button className="todo-button todo-delete" onClick={() => deleteTodo(todo.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;
