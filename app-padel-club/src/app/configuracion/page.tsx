import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import Header from '../../components/ui/Header';
import { CanchasConfiguracion } from '@/src/components/configuracion/CanchasConfiguracion';
import { Horarios } from '@/src/components/horario/Horario';

export default function ConfiguracionPage() {
  return (
    <div className="flex min-h-screen flex-col p-6 bg-zinc-50 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto w-full mt-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 bg-white border border-zinc-200 rounded-xl text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Configuración del Club</h2>
            <p className="text-sm text-zinc-500">Gestiona tus canchas y horarios de atención.</p>
          </div>
        </div>

        <Horarios />

        {/* Sección Canchas */}
        <CanchasConfiguracion />
      </main>
    </div>
  );
}
