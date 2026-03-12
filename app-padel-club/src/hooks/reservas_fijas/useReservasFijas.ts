import { useQuery } from '@tanstack/react-query';
import { startGetReservaFija } from '../../actions/reservaFija.actions';

export const useReservasFijas = (fecha: string) => {
  return useQuery({
    queryKey: ['reservas_fijas', fecha],
    queryFn: () => startGetReservaFija(fecha!),
    staleTime: 1000 * 60 * 60,
  });
};
