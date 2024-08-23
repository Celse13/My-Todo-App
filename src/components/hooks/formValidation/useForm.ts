import { useState, ChangeEvent } from 'react';
import { todoSchema } from '@/lib/todoSchema';
import { z } from 'zod';

export const useTodoForm = () => {
  const [task, setTask] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: number]: string | null }>({});

  const validateTask = (id: number, task: string) => {
    try {
      todoSchema.parse({ task });
      setErrors(prevErrors => ({ ...prevErrors, [id]: null }));
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrors(prevErrors => ({ ...prevErrors, [id]: error.errors.map(e => e.message).join(", ") }));
      }
    }
  };

  const handleTaskChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const newTask = e.target.value;
    setTask(newTask);
    validateTask(id, newTask);
  };

  return {
    task,
    errors,
    setErrors,
    setTask,
    validateTask,
    handleTaskChange,
  };
};
