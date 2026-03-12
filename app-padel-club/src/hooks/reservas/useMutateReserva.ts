import { startAddReserva, startDeleteReserva, startUpdateReserva } from '@/src/actions';
import { Reserva } from '@/src/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateReserva = () => {
  const queryClient = useQueryClient();

  const addReserva = useMutation({
    mutationFn: (reserva: Reserva) => startAddReserva(reserva),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
    },
  });

  const putReserva = useMutation({
    mutationFn: startUpdateReserva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
    },
  });

  const deleteReserva = useMutation({
    mutationFn: startDeleteReserva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
    },
  });

  return {
    addReserva,
    putReserva,
    deleteReserva,
  };
};
