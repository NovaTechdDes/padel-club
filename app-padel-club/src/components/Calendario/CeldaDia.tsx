import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useReservaStore } from '@/src/store';
import { Reserva } from '@/src/interface';

interface Props {
  day: Date;
  reservas: Reserva[];
}

export const CeldaDia = ({ day, reservas }: Props) => {
  const { fecha, setFecha } = useReservaStore();
  const isActive = isSameDay(day, fecha);

  return (
    <button
      onClick={() => setFecha(day)}
      className={`
        w-full flex justify-between items-center px-4 py-3 rounded-xl border transition-all text-left group
        ${
          isActive
            ? 'bg-zinc-900 border-zinc-900 shadow-md ring-2 ring-zinc-900 ring-offset-2 ring-offset-zinc-50'
            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm'
        }
      `}
    >
      <div className="flex flex-col">
        <span className={`text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {format(day, 'eee', { locale: es })}
        </span>
        <span className={`text-xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-zinc-900'}`}>
          {format(day, 'd')}
        </span>
      </div>
      {/* Indicador de que hay reservas ese dia (mock) */}
      {reservas.length > 0 && (
        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
      )}
    </button>
  );
};
