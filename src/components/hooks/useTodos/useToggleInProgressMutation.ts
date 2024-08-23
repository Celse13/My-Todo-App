import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoProgressStatus } from '@/components/hooks/TodoQueries';
import { toast } from 'react-toastify';


export const useToggleInProgress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, toggle }: { id: number; toggle: { inProgress: boolean } }) =>
            toggleTodoProgressStatus(id, toggle),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            });
            toast.success("Todo progress status toggled successfully");
        }
    })
}
