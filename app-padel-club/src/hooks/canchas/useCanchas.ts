import { useQuery } from '@tanstack/react-query';
import { canchas } from '../../data/canchas';
import { Cancha } from '../../interface';

const fetchCanchas = async (): Promise<Cancha[]> => {
  // Simulación de fetch asíncrono
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(canchas);
    }, 500);
  });
};

export const useCanchas = () => {
  return useQuery({
    queryKey: ['canchas'],
    queryFn: fetchCanchas,
  });
};
