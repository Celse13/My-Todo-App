import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "dotenv/config";
import { todoType } from "@/types/todoType";
import {createType} from "@/types/todoType";

const API_URL = process.env.API_URL || "";

export const fetchTodos = async () => {
    const res = await axios.get<todoType[]>('/api/todos');
    return res.data;
};


export const addTodo = async (task: createType) => {
    try {
        const response = await axios.post<todoType>('/api/todos', task);
        return response.data;
    } catch (error: any) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

export const updateTodo = async (todo: todoType): Promise<todoType> => {
    const response = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
};


