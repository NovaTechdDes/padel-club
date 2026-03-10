"use client";

import {  Clock,  ChevronLeft,  } from "lucide-react";
import Link from "next/link";

import Header from "../../components/ui/Header";
import { useClubStore } from "../../store/club.store";
import { CanchasConfiguracion } from "@/src/components/configuracion/CanchasConfiguracion";

export default function ConfiguracionPage() {
  const { horario, setHorario } = useClubStore();
  



  return (
    <div className="flex min-h-screen flex-col p-6 bg-zinc-50 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto w-full mt-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/" 
            className="p-2 bg-white border border-zinc-200 rounded-xl text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Configuración del Club</h2>
            <p className="text-sm text-zinc-500">Gestiona tus canchas y horarios de atención.</p>
          </div>
        </div>

        {/* Sección Horarios */}
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
                value={horario.inicio} 
                onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Fin de Jornada</label>
              <input 
                type="time" 
                value={horario.fin} 
                onChange={(e) => setHorario({ ...horario, fin: e.target.value })}
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all cursor-pointer"
              />
            </div>
            <p className="text-sm text-zinc-400 mb-2">Define el rango horario en el que se pueden realizar reservas.</p>
          </div>
        </section>

        {/* Sección Canchas */}
        <CanchasConfiguracion/>
      </main>
    </div>
  );
}
