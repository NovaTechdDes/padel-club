import { useQuery } from '@tanstack/react-query';
import { getReservas } from '@/src/actions';

export const useReservas = (fecha?: string) => {
  return useQuery({
    queryKey: ['reservas', fecha],
    queryFn: () => getReservas(fecha!),
    staleTime: 1000 * 60 * 60,
  });
};
