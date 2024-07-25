import { ChangeEvent, FC, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    addTodo: (task: string) => void;
}

const AddTodo: FC<Props> = ({ addTodo }) => {
    const [task, setTask] = useState("");

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = () => {
        if (task.trim()) {
            addTodo(task);
            setTask("");
            toast.success("Task added successfully!");
        }
    };

    return (
        <div className="add-todo">
            <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                placeholder="Add a new task"
                className="add-todo-input"
            />
            <button onClick={handleTaskSubmit} className="add-todo-button">
                Add
            </button>
            <ToastContainer />
        </div>
    );
};

export default AddTodo;
