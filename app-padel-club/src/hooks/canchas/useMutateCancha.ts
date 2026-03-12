import { startAddCancha, startDeleteCancha, startUpdateCancha } from '@/src/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateCancha = () => {
  const queryCliente = useQueryClient();

  const postCancha = useMutation({
    mutationFn: startAddCancha,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['canchas'] });
    },
  });

  const updateCancha = useMutation({
    mutationFn: startUpdateCancha,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['canchas'] });
    },
  });

  const deleteCancha = useMutation({
    mutationFn: startDeleteCancha,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['canchas'] });
    },
  });

  return {
    postCancha,
    updateCancha,
    deleteCancha,
  };
};
