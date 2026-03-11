import { useCanchas } from '@/src/hooks';
import { LayoutGrid, Plus, Trash2 } from 'lucide-react';

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
          <div key={cancha.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-all flex flex-col gap-4 group relative">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={cancha.nombre}
                  //onChange={(e) => updateCancha(cancha.id, { nombre: e.target.value })}
                  className="text-lg font-bold text-zinc-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-full mb-1"
                />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-400 tracking-wider">PRECIO: $</span>
                  <input
                    type="number"
                    value={cancha.precio}
                    //onChange={(e) => updateCancha(cancha.id, { precio: Number(e.target.value) })}
                    className="text-sm font-semibold text-zinc-600 bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-24"
                  />
                </div>
              </div>
              <button className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" color="red" />
              </button>
            </div>

            {/* <div className="flex items-center gap-3 pt-2 border-t border-zinc-50">
                   <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={cancha.activo}
                        onChange={(e) => updateCancha(cancha.id, { activo: e.target.checked })}
                        className="w-4 h-4 accent-zinc-900 rounded-sm cursor-pointer"
                        id={`cancha-${cancha.id}`}
                      />
                      <label htmlFor={`cancha-${cancha.id}`} className="text-sm font-medium text-zinc-600 cursor-pointer">
                        {cancha.activo ? "Visible para reservas" : "Fuera de servicio"}
                      </label>
                   </div>
                </div> */}
          </div>
        ))}

        {/* Formulario Agregar Cancha */}
        {/* <form
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
                className="flex-1 bg-white border border-zinc-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400"
              />
              <div className="flex items-center bg-white border border-zinc-200 px-3 rounded-xl focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all">
                <span className="text-zinc-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  placeholder="Precio"
                  value={newCanchaPrice}
                  onChange={(e) => setNewCanchaPrice(Number(e.target.value))}
                  className="w-20 bg-transparent border-none px-1 py-2.5 text-sm focus:outline-none focus:ring-0 placeholder:text-zinc-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!newCanchaName}
              className="w-full bg-zinc-900 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Plus className="w-4 h-4" />
              Agregar Cancha
            </button>
          </div>
        </form> */}
      </div>
    </section>
  );
};
