import { useQuery } from '@tanstack/react-query';
import { reservas } from '../../data/reservas';
import { Reserva } from '../../interface';

const fetchReservas = async (fecha?: string): Promise<Reserva[]> => {
  // Simulación de fetch asíncrono
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = fecha ? reservas.filter((r) => r.fecha === fecha) : reservas;
      resolve(data);
    }, 500);
  });
};

export const useReservas = (fecha?: string) => {
  return useQuery({
    queryKey: ['reservas', fecha],
    queryFn: () => fetchReservas(fecha),
  });
};
