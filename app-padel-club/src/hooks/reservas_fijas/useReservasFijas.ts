import { useQuery } from '@tanstack/react-query';
import { startGetReservaFija } from '../../actions/reservaFija.actions';
import { useAuthStore } from '@/src/store/auth.store';

export const useReservasFijas = (fecha: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['reservas_fijas', fecha],
    queryFn: () => startGetReservaFija(fecha!),
    enabled: !!user,
    staleTime: 1000 * 60 * 60,
  });
};
