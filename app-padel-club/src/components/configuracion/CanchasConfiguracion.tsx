'use client';
import { useCanchas } from '@/src/hooks';
import { LayoutGrid } from 'lucide-react';
import { CanchaItem } from './Cancha';
import { FormCancha } from './FormCancha';

export const CanchasConfiguracion = () => {
  const { data: canchas, isLoading } = useCanchas();

  if (isLoading) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-zinc-900" />
          <h3 className="text-lg font-semibold text-zinc-900">Gestión de Canchas</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {canchas?.map((cancha) => (
          <CanchaItem key={cancha.id} cancha={cancha} />
        ))}

        <FormCancha />
      </div>
    </section>
  );
};
