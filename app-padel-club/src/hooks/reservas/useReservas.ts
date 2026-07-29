import { useQuery } from '@tanstack/react-query';
import { getReservas } from '@/src/actions';
import { useAuthStore } from '@/src/store/auth.store';

export const useReservas = (fecha?: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['reservas', fecha],
    queryFn: () => getReservas(fecha!),
    enabled: !!user,
    staleTime: 1000 * 60 * 60,
  });
};
