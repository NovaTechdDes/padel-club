'use client';
import { useMutateCancha } from '@/src/hooks/canchas/useMutateCancha';
import { mensaje } from '@/src/utils/mensaje';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const FormCancha = () => {
  const { postCancha } = useMutateCancha();

  const [newCanchaName, setNewCanchaName] = useState<string>('');
  const [newCanchaPrice, setNewCanchaPrice] = useState<number>(0);

  const handleAddCancha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await postCancha.mutateAsync({ nombre: newCanchaName, precio: newCanchaPrice, activo: true });

    if (res) {
      setNewCanchaName('');
      setNewCanchaPrice(0);
      mensaje('Cancha agregada correctamente', 'success');
    }
  };

  return (
    <form
      onSubmit={handleAddCancha}
      className="bg-zinc-100/50 p-5 rounded-2xl border border-dashed border-zinc-300 flex flex-col gap-4 items-center justify-center min-h-[160px] group hover:bg-zinc-100 hover:border-zinc-400 transition-all cursor-pointer"
      onClick={() => {
        if (newCanchaName === '') document.getElementById('new-cancha-name')?.focus();
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-2 flex-col md:flex-row">
          <input
            id="new-cancha-name"
            type="text"
            placeholder="Nombre de la cancha..."
            value={newCanchaName}
            onChange={(e) => setNewCanchaName(e.target.value)}
            className="flex-1 bg-white border text-black border-zinc-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400"
          />
          <div className="flex items-center bg-white border border-zinc-200 px-3 rounded-xl focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all">
            <span className="text-zinc-400 text-sm font-semibold">$</span>
            <input
              type="number"
              placeholder="Precio"
              value={newCanchaPrice}
              onChange={(e) => setNewCanchaPrice(Number(e.target.value))}
              className="w-20 bg-transparent border-none text-black px-1 py-2.5 text-sm focus:outline-none focus:ring-0 placeholder:text-zinc-400"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!newCanchaName || postCancha.isPending}
          className="w-full bg-zinc-900 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <Plus className="w-4 h-4" />
          {postCancha.isPending ? 'Agregando...' : 'Agregar Cancha'}
        </button>
      </div>
    </form>
  );
};
