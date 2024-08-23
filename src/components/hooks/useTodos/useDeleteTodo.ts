import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/components/hooks/TodoQueries';
import { toast } from 'react-toastify';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success("Todo deleted successfully");
    }
  });
};
