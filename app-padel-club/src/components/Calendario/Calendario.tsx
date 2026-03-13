'use client';

import { useCanchas } from '@/src/hooks/canchas/useCanchas';
import { useReservas } from '@/src/hooks/reservas/useReservas';
import { useReservaStore } from '@/src/store';
import { generateHours } from '@/src/utils/generateHours';
import { Clock, Loader2 } from 'lucide-react';
import { ModalReserva } from './ModalReserva';
import { CeldaCancha } from './CeldaCancha';
import { format } from 'date-fns';
import { useHorarios } from '@/src/hooks/horarios/useHorarios';
import { useReservasFijas } from '@/src/hooks/reservas_fijas/useReservasFijas';

export default function Calendar() {
  const { modal, abrirModal, fecha } = useReservaStore();
  const { data: horario, isLoading } = useHorarios();

  const hours = generateHours(horario ?? { inicio: '08:00', fin: '23:00', id: '' });

  // Obtener canchas y reservas con TanStack Query
  const { data: canchasData, isLoading: loadingCanchas } = useCanchas();

  const { data: reservasData, isLoading: loadingReservas } = useReservas(format(fecha, 'yyyy-MM-dd'));

  const { data: reservasFijas, isLoading: loadingReservasFijas } = useReservasFijas(format(fecha, 'yyyy-MM-dd'));

  const getReserva = (canchaId: string, hora: string) => {
    return reservasData?.find((r) => r.cancha_id === canchaId && r.hora_inicio === hora);
  };

  const getReservaFija = (canchaId: string, hora: string) => {
    return reservasFijas?.find((r) => r.cancha_id === canchaId && r.hora_inicio === hora);
  };

  if (loadingCanchas || loadingReservas || loadingReservasFijas) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-zinc-200 mt-2 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium">Cargando disponibilidad...</p>
      </div>
    );
  }

  const currentCanchas = canchasData || [];

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col mt-2">
      {/* Header Canchas */}
      <div className="grid grid-cols-[80px_1fr_1fr] border-b border-zinc-200 bg-zinc-50/80 rounded-t-2xl">
        <div className="p-4 border-r border-zinc-200 flex items-center justify-center">
          <Clock className="w-4 h-4 text-zinc-400" />
        </div>
        {currentCanchas.map((c, i) => (
          <div key={c.id} className={`py-4 px-2 text-center ${i === 0 ? 'border-r border-zinc-200' : ''}`}>
            <p className="text-[13px] uppercase tracking-wider font-semibold text-zinc-900">{c.nombre}</p>
          </div>
        ))}
      </div>

      {/* Grid Horarios */}
      <div className="flex flex-col relative w-full rounded-b-2xl">
        {hours.map((hora, index) => {
          const isLast = index === hours.length - 1;
          return (
            <div key={hora} className={`grid grid-cols-[80px_1fr_1fr] group ${!isLast ? 'border-b border-zinc-100' : ''}`}>
              {/* Eje de tiempo */}
              <div className="h-[90px] px-2 py-3 border-r border-zinc-200 flex items-start justify-center text-xs font-semibold text-zinc-500 bg-white group-hover:bg-zinc-50/50 transition-colors">
                {hora}
              </div>
              {currentCanchas.map((c, i) => {
                const reserva = getReserva(c.id, hora);
                const reservaFija = getReservaFija(c.id, hora);
                return <CeldaCancha key={c.id} reserva={reserva} reservaFija={reservaFija} c={c} i={i} hora={hora} abrirModal={abrirModal} />;
              })}
            </div>
          );
        })}
      </div>

      {modal && <ModalReserva />}
    </div>
  );
}
