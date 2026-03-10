"use client";

import { canchas } from "@/src/data/canchas";
import { reservas } from "@/src/data/reservas";
import { generateHours } from "@/src/utils/generateHours";
import { Clock, DollarSign } from "lucide-react";

export default function Calendar() {
  const hours = generateHours();

  const getReserva = (canchaId: string, hora: string) => {
    return reservas.find(
      (r) => r.cancha_id === canchaId && r.hora_inicio === hora,
    );
  };

  const getDurationInHours = (inicio: string, fin: string) => {
    const [h1, m1] = inicio.split(":").map(Number);
    const [h2, m2] = fin.split(":").map(Number);
    return (h2 + m2 / 60) - (h1 + m1 / 60);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col mt-2">
      {/* Header Canchas */}
      <div className="grid grid-cols-[80px_1fr_1fr] border-b border-zinc-200 bg-zinc-50/80 rounded-t-2xl">
        <div className="p-4 border-r border-zinc-200 flex items-center justify-center">
          <Clock className="w-4 h-4 text-zinc-400" />
        </div>
        {canchas.map((c, i) => (
          <div key={c.id} className={`py-4 px-2 text-center ${i === 0 ? 'border-r border-zinc-200' : ''}`}>
            <p className="text-[13px] uppercase tracking-wider font-semibold text-zinc-900">{c.nombre}</p>
          </div>
        ))}
      </div>

      {/* Grid Horarios */}
      <div className="flex flex-col relative w-full rounded-b-2xl">
        {hours.map((hora, index) => {
          const isLast = index === hours.length - 1;
          return (
            <div key={hora} className={`grid grid-cols-[80px_1fr_1fr] group ${!isLast ? 'border-b border-zinc-100' : ''}`}>
              {/* Eje de tiempo */}
              <div className="h-[90px] px-2 py-3 border-r border-zinc-200 flex items-start justify-center text-xs font-semibold text-zinc-500 bg-white group-hover:bg-zinc-50/50 transition-colors">
                {hora}
              </div>

              {/* Celdas de Canchas */}
              {canchas.map((c, i) => {
                const reserva = getReserva(c.id, hora);

                return (
                  <div key={c.id} className={`relative h-[90px] p-2 ${i === 0 ? 'border-r border-zinc-100' : ''}`}>
                    {/* HUECO LIBRE INTACTO (State default) */}
                    <div className="w-full h-full rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 flex flex-col items-center justify-center text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] uppercase font-bold tracking-widest mb-0.5">Libre</span>
                      <span className="text-[10px] font-medium">{hora}</span>
                    </div>

                    {/* TOKEN DE RESERVA (Elevation 2) */}
                    {reserva && (
                      <div 
                        className="absolute top-2 left-2 right-2 z-10 rounded-xl bg-[#e3f0fa] border-2 border-white shadow-sm flex flex-col p-3 overflow-hidden ring-1 ring-black/5"
                        style={{ height: `calc(${getDurationInHours(reserva.hora_inicio, reserva.hora_fin) * 90}px - 16px)` }}
                      >
                        <div className="flex justify-between items-start mb-0.5">
                          <span className="text-[15px] font-bold text-[#144b75] tracking-tight leading-none capitalize">
                            {reserva.nombre_cliente}
                          </span>
                          {reserva.estado === 'pendiente' && (
                            <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm shrink-0">
                              <DollarSign className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-[#4084bf]">
                          {reserva.hora_inicio} - {reserva.hora_fin}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
