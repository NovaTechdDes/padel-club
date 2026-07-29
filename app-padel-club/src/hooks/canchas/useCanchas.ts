import { getCanchas } from '@/src/actions';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/store/auth.store';

export const useCanchas = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['canchas'],
    queryFn: getCanchas,
    enabled: !!user,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
};
