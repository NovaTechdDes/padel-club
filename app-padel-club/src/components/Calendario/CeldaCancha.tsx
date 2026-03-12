import { useState } from 'react';
import { Cancha, Reserva } from '@/src/interface';
import { DollarSign } from 'lucide-react';
import { getDurationInHours } from '@/src/utils/getDurationInHours';
import { getHourNow } from '@/src/utils/getHourNow';
import { useReservaStore } from '@/src/store';

interface Props {
  c: Cancha;
  i: number;
  hora: string;
  reserva?: Reserva;
  abrirModal: (hora?: string) => void;
}

export const CeldaCancha = ({ c, i, hora, reserva, abrirModal }: Props) => {
  const { setReservaSeleccionado, setCanchaSeleccionada } = useReservaStore();
  const [horaPasada] = useState<boolean>(() => {
    if (parseInt(hora) <= getHourNow()) {
      return true;
    } else {
      return false;
    }
  });

  const handleModal = () => {
    if (!reserva) return null;

    setReservaSeleccionado(reserva);
    abrirModal();
  };

  const abrirModalVacio = () => {
    abrirModal(hora);
    setCanchaSeleccionada(c);
  };

  return (
    <div key={c.id} className={`relative h-[90px] p-2 border-b border-dashed border-zinc-100 ${i === 0 ? 'border-r' : ''} ${horaPasada ? 'cursor-not-allowed bg-gray-300' : ''}`}>
      {/* HUECO LIBRE INTACTO (State default) */}
      {horaPasada ? (
        <div className="w-full h-full  bg-gray-300  flex flex-col items-center justify-center text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer active:scale-[0.98]"></div>
      ) : (
        <div
          onClick={abrirModalVacio}
          className="w-full h-full rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 flex flex-col items-center justify-center text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer active:scale-[0.98]"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest mb-0.5">Libre</span>
          <span className="text-[10px] font-medium">{hora}</span>
        </div>
      )}

      {/* TOKEN DE RESERVA (Elevation 2) */}
      {reserva && (
        <div
          onClick={handleModal}
          className="absolute top-2 left-2 right-2 z-10 rounded-xl bg-[#e3f0fa] border-2 border-white shadow-sm flex flex-col p-3 overflow-hidden ring-1 ring-black/5"
          style={{
            height: `calc(${getDurationInHours(reserva.hora_inicio, reserva.hora_fin) * 90}px - 16px)`,
          }}
        >
          <div className="flex justify-between items-start mb-0.5">
            <span className="text-[15px] font-bold text-[#144b75] tracking-tight leading-none capitalize">{reserva.nombre_cliente}</span>
            {reserva.estado === 'pendiente' && (
              <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm shrink-0">
                <DollarSign className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <span className="text-xs font-semibold text-[#4084bf]">
            {reserva.hora_inicio} - {reserva.hora_fin}
          </span>
        </div>
      )}
    </div>
  );
};
