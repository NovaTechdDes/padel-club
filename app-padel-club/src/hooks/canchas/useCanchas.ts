import { getCanchas } from '@/src/actions';
import { useQuery } from '@tanstack/react-query';

export const useCanchas = () => {
  return useQuery({
    queryKey: ['canchas'],
    queryFn: getCanchas,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
};
