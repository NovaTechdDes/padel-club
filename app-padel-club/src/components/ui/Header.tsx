'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth.store';
import Image from 'next/image';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="flex items-center justify-between pb-6 border-b  border-zinc-200 sticky top-0 bg-zinc-50/80 backdrop-blur-md z-12">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <Image src="/public/logo.png" alt="Logo" className="rounded-full" width={40} height={40} />

          <div className="flex flex-col justify-center">
            <Image src="/public/titulo.png" alt="Logo" width={110} height={110} />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              href="/configuracion"
              className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl shadow-sm hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-all flex items-center gap-2.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            >
              <Settings className="w-4 h-4 text-zinc-500 group-hover:rotate-12 transition-transform" />
              Configuración
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-2.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}
