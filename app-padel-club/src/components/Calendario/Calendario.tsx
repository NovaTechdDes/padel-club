'use client';

import { canchas } from '@/src/data/canchas';
import { reservas } from '@/src/data/reservas';
import { useReservaStore } from '@/src/store';
import { generateHours } from '@/src/utils/generateHours';
import { Clock, DollarSign } from 'lucide-react';
import { ModalReserva } from './ModalReserva';
import { CeldaCancha } from './CeldaCancha';

export default function Calendar() {
  const { modal, abrirModal } = useReservaStore();
  const hours = generateHours();

  const getReserva = (canchaId: string, hora: string) => {
    return reservas.find((r) => r.cancha_id === canchaId && r.hora_inicio === hora);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col mt-2">
      {/* Header Canchas */}
      <div className="grid grid-cols-[80px_1fr_1fr] border-b border-zinc-200 bg-zinc-50/80 rounded-t-2xl">
        <div className="p-4 border-r border-zinc-200 flex items-center justify-center">
          <Clock className="w-4 h-4 text-zinc-400" />
        </div>
        {canchas.map((c, i) => (
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
              {canchas.map((c, i) => {
                const reserva = getReserva(c.id, hora);
                return <CeldaCancha key={c.id} reserva={reserva} c={c} i={i} hora={hora} abrirModal={abrirModal} />;
              })}
            </div>
          );
        })}
      </div>

      {modal && <ModalReserva />}
    </div>
  );
}
