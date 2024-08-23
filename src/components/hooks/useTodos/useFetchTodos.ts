import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/components/hooks/TodoQueries';

export const useFetchTodos = () => {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ['todos'],
  });
};
