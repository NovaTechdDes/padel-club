'use client';

import { useMutateCancha } from '@/src/hooks/canchas/useMutateCancha';
import { Cancha } from '@/src/interface';
import { mensaje } from '@/src/utils/mensaje';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  cancha: Cancha;
}

export const CanchaItem = ({ cancha }: Props) => {
  const { deleteCancha, updateCancha } = useMutateCancha();
  const [canchaAux, setCanchaAux] = useState<Cancha>(cancha);

  const handleUpdate = async () => {
    if (cancha.nombre === canchaAux.nombre && cancha.precio === canchaAux.precio) return null;

    const res = await updateCancha.mutateAsync({ id: cancha.id, precio: canchaAux.precio, nombre: canchaAux.nombre });

    if (res) {
      mensaje('Cancha actualizada Correctamente', 'success');
    }
  };

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: `Eliminar Cancha ${cancha.nombre}`,
      text: '¿Estás seguro de que quieres eliminar esta cancha?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      const res = await deleteCancha.mutateAsync(cancha.id);

      if (res) {
        mensaje('Cancha eliminado Correctamente', 'success');
      }
    }
  };

  return (
    <div key={cancha.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-all flex flex-col gap-4 group relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <input
            type="text"
            value={canchaAux.nombre}
            onChange={(e) => setCanchaAux({ ...canchaAux, nombre: e.target.value })}
            onBlur={handleUpdate}
            className="text-lg font-bold text-zinc-900  bg-transparent border border-zinc-200 rounded-lg p-0 focus:outline-none focus:ring-0 w-full mb-1"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-zinc-400 tracking-wider">PRECIO: $</span>
            <input
              type="number"
              value={canchaAux.precio}
              onChange={(e) => setCanchaAux({ ...canchaAux, precio: Number(e.target.value) })}
              onBlur={handleUpdate}
              className="text-sm font-semibold text-zinc-600 bg-transparent border px-2 py-1 border-zinc-200 rounded-lg focus:outline-none focus:ring-0 w-24"
            />
          </div>
        </div>

        <button onClick={handleDelete} disabled={deleteCancha.isPending} className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all  cursor-pointer">
          <Trash2 className="w-4 h-4" color="red" />
        </button>
      </div>
    </div>
  );
};
