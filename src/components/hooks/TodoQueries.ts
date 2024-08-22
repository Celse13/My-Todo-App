import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "dotenv/config";
import { todoType } from "@/types/todoType";
import { createType } from "@/types/todoType";

// const API_URL = process.env.API_URL || "";

export const fetchTodos = async () => {
    try {
        const { data } = await axios.get<todoType>('/api/todos');
        console.log('response of data', data)
        return data;
    } catch (error: any) {
        console.log(error);
    }

};


export const addTodo = async (task: createType) => {
    try {
        const response = await axios.post<todoType>('/api/todos', task);
        return response.data;
    } catch (error: any) {
        console.error('Error adding todo:', error);
    }
};

export const updateTodo = async (id: number, updates: { task: string }) => {
    const response = await axios.patch(`/api/todos/${id}`, updates);
    return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`/api/todos/${id}`);
};


export const toggleTodoStatus = async (id: number, toggle : { completed: boolean}) => {
    const response = await axios.put(`/api/todos/${id}`, toggle);
    return response;
};

export const toggleTodoProgressStatus = async (id: number, toggle : { inProgress: boolean}) => {
    const response = await axios.put(`/api/todos/${id}`, toggle);
    return response;
}
