'use client';
import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import { reservas } from '@/src/data/reservas';
import { useReservaStore } from '@/src/store';
import { CeldaDia } from './CeldaDia';

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import '@/src/styles/calendar.css';

export default function Filtro() {
  const days = Array.from({ length: 31 }, (_, i) => addDays(new Date(), i));
  const { fecha } = useReservaStore();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
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
          <h2 className="text-[17px] font-semibold text-zinc-900 tracking-tight capitalize">{format(fecha, "EEEE, d 'de' MMMM", { locale: es })}</h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => swiper?.slidePrev()}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors focus:ring-2 focus:ring-zinc-900/10 active:scale-95 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors focus:ring-2 focus:ring-zinc-900/10 active:scale-95 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative px-1 cursor-grab active:cursor-grabbing">
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2.5, spaceBetween: 12 },
            640: { slidesPerView: 4.5, spaceBetween: 12 },
            768: { slidesPerView: 6.5, spaceBetween: 12 },
            1024: { slidesPerView: 8.5, spaceBetween: 12 },
          }}
          className=""
        >
          {days.map((day, index) => (
            <SwiperSlide key={index}>
              <CeldaDia day={day} reservas={reservas} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
