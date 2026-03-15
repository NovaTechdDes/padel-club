import { useState } from 'react';
import { Cancha, Reserva } from '@/src/interface';
import { Repeat } from 'lucide-react';
import { getDurationInHours } from '@/src/utils/getDurationInHours';
import { getHourNow } from '@/src/utils/getHourNow';
import { useReservaStore } from '@/src/store';
import { format, getDay, parseISO } from 'date-fns';

interface Props {
  c: Cancha;
  i: number;
  hora: string;
  reserva?: Reserva;
  reservaFija?: Reserva;
  abrirModal: (hora?: string) => void;
}

export const CeldaCancha = ({ c, i, hora, reserva, reservaFija, abrirModal }: Props) => {
  const { setReservaSeleccionado, setCanchaSeleccionada, fecha } = useReservaStore();
  const [horaPasada] = useState<boolean>(() => {
    if (parseInt(hora) <= getHourNow()) {
      return true;
    } else {
      return false;
    }
  });

  const handleModal = () => {
    const seleccioanda = reserva || reservaFija;
    if (!seleccioanda) return null;

    setReservaSeleccionado(seleccioanda);
    abrirModal();
  };

  const abrirModalVacio = () => {
    abrirModal(hora);
    setCanchaSeleccionada(c);
  };

  const fechaSeleccionada = parseISO(fecha.toISOString());
  const dia = getDay(fechaSeleccionada);

  return (
    <div key={c.id} className={`relative h-[70px] p-2 border-b border-zinc-100 ${i === 0 ? 'border-r' : ''} ${horaPasada && fecha < new Date() ? 'cursor-not-allowed bg-gray-300' : ''}`}>
      {/* HUECO LIBRE INTACTO (State default) */}
      {horaPasada && fecha < new Date() ? (
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
          className="absolute top-1.5 left-1.5 right-1.5 z-10 rounded-xl bg-[#e3f0fa] border-2 border-white shadow-sm flex flex-col p-2 overflow-hidden ring-1 ring-black/5"
          style={{
            height: `calc(${getDurationInHours(reserva.hora_inicio, reserva.hora_fin) * 70}px - 12px)`,
          }}
        >
          <div className="flex justify-between items-start mb-0.5">
            <span className="text-[13px] font-bold text-[#144b75] tracking-tight leading-none capitalize">{reserva.nombre_cliente}</span>
          </div>
          <span className="text-[10px] font-semibold text-[#4084bf]">
            {reserva.hora_inicio} - {reserva.hora_fin}
          </span>
        </div>
      )}

      {reservaFija && reservaFija.fecha.slice(0, 10) <= format(fecha, 'yyyy-MM-dd') && parseInt(reservaFija?.dia_semana || '0') === dia && (
        <div
          onClick={handleModal}
          className="absolute top-1.5 left-1.5 right-1.5 z-20 rounded-xl bg-violet-50 border-2 border-white shadow-md flex flex-col p-2 overflow-hidden ring-1 ring-violet-200 group/fija transition-all hover:ring-violet-400"
          style={{
            height: `calc(${getDurationInHours(reservaFija.hora_inicio, reservaFija.hora_fin) * 70}px - 12px)`,
          }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[12px] font-bold text-violet-950 tracking-tight leading-none capitalize">{reservaFija.nombre_cliente}</span>
            <div className="bg-violet-100 p-0.5 rounded-lg">
              <Repeat className="w-3 h-3 text-violet-600 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] font-extrabold text-violet-700 bg-violet-100/50 px-1.5 py-0.5 rounded-full border border-violet-200 uppercase tracking-widest shadow-sm">Fija</span>
            <span className="text-[10px] font-semibold text-violet-400 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-violet-300"></span>
              {reservaFija.hora_inicio} - {reservaFija.hora_fin}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
