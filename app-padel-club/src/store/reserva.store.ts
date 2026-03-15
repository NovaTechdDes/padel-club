import { create } from 'zustand';
import { Cancha, Reserva } from '../interface';

interface ReservaState {
  fecha: Date;
  setFecha: (fecha: Date) => void;

  modal: boolean;
  abrirModal: (hora?: string) => void;
  cerrarModal: () => void;

  reservaSeleccionado: Reserva | null;
  setReservaSeleccionado: (reserva: Reserva | null) => void;

  hora_inicio_seleccionado: string;
  hora_fin_seleccionado: string;

  canchaSeleccionada: Cancha | null;
  setCanchaSeleccionada: (cancha: Cancha) => void;
}

export const useReservaStore = create<ReservaState>((set) => ({
  fecha: new Date(),
  setFecha: (fecha) => set({ fecha }),

  modal: false,
  abrirModal: (hora?: string) => {
    const startHour = parseInt(hora ?? '0');
    const endHour = (startHour + 2) % 24; // Reservar 1 hora por defecto (o 1.5, pero con entero es mejor 1 o 2). Voy a ponerle 1.
    return set({
      modal: true,
      hora_inicio_seleccionado: hora ? hora.padStart(5, '0') : '',
      hora_fin_seleccionado: `${endHour.toString().padStart(2, '0')}:00`,
    });
  },
  cerrarModal: () =>
    set({
      modal: false,
      hora_inicio_seleccionado: '15:00',
      hora_fin_seleccionado: '17:00',
    }),

  reservaSeleccionado: null,
  setReservaSeleccionado: (reserva) => set({ reservaSeleccionado: reserva }),

  hora_inicio_seleccionado: '',
  hora_fin_seleccionado: '',

  canchaSeleccionada: null,
  setCanchaSeleccionada: (cancha) => set({ canchaSeleccionada: cancha }),
}));
