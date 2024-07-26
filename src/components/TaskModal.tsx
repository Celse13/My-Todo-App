// src/components/TaskModal.tsx
import { FC, useState } from "react";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: string, description: string) => void;
}

const TaskModal: FC<TaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(task, description);
        setTask("");
        setDescription("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl mb-4">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Task</label>
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 border rounded bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border rounded bg-blue-500 text-white"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
