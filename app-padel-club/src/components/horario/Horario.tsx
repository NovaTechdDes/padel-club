'use client';

import { useHorarios } from '@/src/hooks/horarios/useHorarios';
import { useMutateHorarios } from '@/src/hooks/horarios/useMutateHorarios';
import { Horario } from '@/src/interface';
import { mensaje } from '@/src/utils/mensaje';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Horarios = () => {
  const { data, isLoading } = useHorarios();
  const { putHorario } = useMutateHorarios();

  const [horario, setHorario] = useState<Horario>({
    inicio: '',
    fin: '',
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setHorario(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Cargando horario...</div>;
  }

  const handlePutHorario = async () => {
    if (!horario.inicio || !horario.fin) {
      return;
    }

    const res = await putHorario.mutateAsync(horario);

    if (res) {
      mensaje('Horario actualizado Correctamente', 'success');
    } else {
      mensaje('Error al actualizar el horario', 'error');
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-zinc-900" />
        <h3 className="text-lg font-semibold text-zinc-900">Horario de Atención</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap gap-8 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Inicio de Jornada</label>
          <input
            type="time"
            value={horario?.inicio}
            onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}
            className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Fin de Jornada</label>
          <input
            type="time"
            value={horario?.fin}
            onChange={(e) => setHorario({ ...horario, fin: e.target.value })}
            className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all cursor-pointer"
          />
        </div>

        <p className="text-sm text-zinc-400 mb-2">Define el rango horario en el que se pueden realizar reservas.</p>

        <div className="flex justify-end w-full">
          <button
            disabled={putHorario.isPending}
            onClick={handlePutHorario}
            className="bg-green-600 text-white px-4 py-2 rounded-xl w-full hover:bg-green-700 transition-all cursor-pointer active:bg-green-800"
          >
            {putHorario.isPending ? 'Aplicando...' : 'Aplicar Cambios'}
          </button>
        </div>
      </div>
    </section>
  );
};
