import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "dotenv/config";
import { todoType } from "@/types/todoType";

const API_URL = process.env.API_URL || "";

export const fetchTodos = async () => {
    const res = await axios.get<todoType[]>(`${API_URL}/todos`);
    return res.data;
};

export const addTodo = async (task: string): Promise<todoType> => {
    const response = await axios.post(`${API_URL}/todos`, { task });
    return response.data;
};

export const updateTodo = async (todo: todoType): Promise<todoType> => {
    const response = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
};


