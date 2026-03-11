import { startPutHorario } from '@/src/actions/horarios.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateHorarios = () => {
  const queryClient = useQueryClient();

  const putHorario = useMutation({
    mutationFn: startPutHorario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horarios'] });
    },
  });

  return {
    putHorario,
  };
};
