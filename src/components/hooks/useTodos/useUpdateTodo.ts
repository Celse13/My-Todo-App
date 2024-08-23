import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/components/hooks/TodoQueries';
import { toast } from 'react-toastify';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { task: string } }) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success("Todo updated successfully");
    }
  });
};
