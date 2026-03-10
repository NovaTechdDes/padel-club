'use client';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { reservas } from '@/src/data/reservas';

export default function Filtro() {
  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-6 flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white border border-zinc-200 shadow-sm rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-zinc-600" />
          </div>
          <h2 className="text-[17px] font-semibold text-zinc-900 tracking-tight capitalize">{format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}</h2>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors focus:ring-2 focus:ring-zinc-900/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors focus:ring-2 focus:ring-zinc-900/10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative px-1 cursor-grab active:cursor-grabbing">
        <Swiper
          slidesPerView={4.5}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 7, spaceBetween: 12 },
          }}
        >
          {days.map((day, index) => {
            const isToday = index === 0;
            return (
              <SwiperSlide key={index}>
                <button
                  className={`
                    w-full flex justify-between items-center px-4 py-3 rounded-xl border transition-all text-left group
                    ${
                      isToday
                        ? 'bg-zinc-900 border-zinc-900 shadow-md ring-2 ring-zinc-900 ring-offset-2 ring-offset-zinc-50'
                        : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${isToday ? 'text-zinc-400' : 'text-zinc-500'}`}>{format(day, 'eee', { locale: es })}</span>
                    <span className={`text-xl font-bold tracking-tight ${isToday ? 'text-white' : 'text-zinc-900'}`}>{format(day, 'd')}</span>
                  </div>
                  {/* Indicador de que hay reservas ese dia (mock) */}
                  {reservas.length > 0 && <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-emerald-400' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
