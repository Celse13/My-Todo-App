import { useState } from 'react';

export const useDialog = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openDialog = (id: number) => {
    setTodoToDelete(id);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setTodoToDelete(null);
  };

  return {
    showDialog,
    todoToDelete,
    isDeleting,
    setIsDeleting,
    openDialog,
    closeDialog,
  };
};
