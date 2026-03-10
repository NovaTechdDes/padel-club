import { Settings } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-zinc-200 sticky top-0 bg-zinc-50/80 backdrop-blur-md z-12">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-zinc-800 transition-colors">
            <span className="text-white font-bold text-sm tracking-tight">
              SET
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[16px] font-bold text-zinc-900 tracking-tight leading-none mb-1">
              Padel Club
            </h1>
            <p className="text-[11px] text-zinc-500 font-bold leading-none tracking-[0.2em] uppercase">
              Chajarí
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          href="/configuracion" 
          className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl shadow-sm hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-all flex items-center gap-2.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        >
          <Settings className="w-4 h-4 text-zinc-500 group-hover:rotate-12 transition-transform" />
          Configuración
        </Link>
      </div>
    </header>
  );
}
