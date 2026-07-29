import { getHorarios } from '@/src/actions/horarios.actions';
import { Horario } from '@/src/interface';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/store/auth.store';

export const useHorarios = () => {
  const { user } = useAuthStore();
  return useQuery<Horario>({
    queryKey: ['horarios'],
    queryFn: getHorarios,
    enabled: !!user,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 semana
  });
};
