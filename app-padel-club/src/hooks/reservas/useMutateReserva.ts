import { startAddReserva, startDeleteReserva, startUpdateReserva } from '@/src/actions';
import { Reserva } from '@/src/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateReserva = () => {
  const queryClient = useQueryClient();

  const addReserva = useMutation({
    mutationFn: (reserva: Reserva) => startAddReserva(reserva),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['reservas_fijas'] });
    },
  });

  const putReserva = useMutation({
    mutationFn: startUpdateReserva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['reservas_fijas'] });
    },
  });

  const deleteReserva = useMutation({
    mutationFn: (reserva: { id: string; fijo: boolean }) => startDeleteReserva(reserva),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['reservas_fijas'] });
    },
  });

  return {
    addReserva,
    putReserva,
    deleteReserva,
  };
};
