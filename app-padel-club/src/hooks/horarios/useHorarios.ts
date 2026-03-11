import { getHorarios } from '@/src/actions/horarios.actions';
import { Horario } from '@/src/interface';

import { useQuery } from '@tanstack/react-query';

export const useHorarios = () => {
  return useQuery<Horario>({
    queryKey: ['horarios'],
    queryFn: getHorarios,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 semana
  });
};
