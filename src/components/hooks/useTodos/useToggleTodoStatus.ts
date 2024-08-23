import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTodoStatus } from '@/components/hooks/TodoQueries';
import { toast } from 'react-toastify';

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, toggle }: { id: number; toggle: { completed: boolean, inProgress: boolean } }) => toggleTodoStatus(id, toggle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success("Todo status toggled successfully");
    }
  });
};
