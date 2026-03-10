import { Bell, Menu, MoreVertical } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-zinc-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm tracking-tight">
              SET
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[15px] font-semibold text-zinc-900 tracking-tight leading-none mb-1">
              Padel Club
            </h1>
            <p className="text-[11px] text-zinc-500 font-medium leading-none tracking-widest uppercase">
              Chajarí
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg shadow-sm hover:border-zinc-300 hover:text-zinc-900 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-900/10">
          <MoreVertical className="w-4 h-4 text-zinc-400" />
          Opciones
        </button>
      </div>
    </header>
  );
}
