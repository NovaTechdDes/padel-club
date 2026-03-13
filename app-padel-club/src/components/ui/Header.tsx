"use client";

import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que volver a ingresar tus credenciales.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#18181b',
      cancelButtonColor: '#d4d4d8',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#18181b',
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      logout();
      router.push("/login");
    }
  };

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
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-zinc-100 text-zinc-700 text-sm font-semibold rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2.5 active:scale-95"
            >
              <LogOut className="w-4 h-4 text-zinc-500" />
              Salir
            </button>
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
