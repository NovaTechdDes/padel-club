"use client";
import { format, addDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getDay } from "@/src/utils/getDay";
import { ArrowBigDown, ArrowLeft, ArrowRight } from "lucide-react";

export default function Filtro() {
  // Generamos los próximos 30 días
  const days = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="w-full bg-gray-200 py-4 ">
      <div className="flex justify-between py-2 px-10">
        <div className="text-black p-2 bg-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
          <ArrowLeft />
        </div>
        <h2 className="text-black text-2xl font-bold">{getDay()}</h2>
        <div className="text-black p-2 bg-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
          <ArrowRight />
        </div>
      </div>

      <Swiper
        slidesPerView={5.5} // Muestra 5 días y un pedacito del sexto para indicar scroll
        spaceBetween={5}
        slidesOffsetBefore={8}
        slidesOffsetAfter={8}
        grabCursor={true}
      >
        {days.map((day, index) => (
          <SwiperSlide key={index}>
            <button className="flex flex-col items-center justify-center w-14 h-20 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-black focus:text-white transition-colors">
              <span className="text-xs font-medium uppercase text-black">
                {format(day, "eee", { locale: es })}
              </span>
              <span className="text-lg font-bold text-gray-600">
                {format(day, "d")}
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
