"use client";

import { canchas } from "@/src/data/canchas";
import { reservas } from "@/src/data/reservas";
import { generateHours } from "@/src/utils/generateHours";

export default function Calendar() {
  const hours = generateHours();
  console.log(hours);

  const getReserva = (canchaId: string, hora: string) => {
    return reservas.find(
      (r) => r.cancha_id === canchaId && r.hora_inicio === hora,
    );
  };

  return (
    <div className="bg-white rounded-xl shadow">
      {/* header */}
      <div className="grid grid-cols-3 border-b">
        <div className="p-2"></div>

        {canchas.map((c) => (
          <div key={c.id} className="p-2 text-center font-bold">
            <p className="text-black">{c.nombre}</p>
          </div>
        ))}
      </div>

      {/* horarios */}
      {hours.map((hora) => (
        <div key={hora} className="grid grid-cols-3 border-b">
          <div className="p-2 text-sm text-gray-500">{hora}</div>

          {canchas.map((c) => {
            const reserva = getReserva(c.id, hora);

            return (
              <div key={c.id} className="p-2 border-l h-16">
                {reserva && (
                  <div className="bg-blue-400 text-white rounded-lg p-1 text-xs">
                    {reserva.nombre_cliente}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
