import { create } from 'zustand';
import { Reserva } from '../interface';

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
}

export const useReservaStore = create<ReservaState>((set) => ({
  fecha: new Date(),
  setFecha: (fecha) => set({ fecha }),

  modal: false,
  abrirModal: (hora?: string) =>
    set({
      modal: true,
      hora_inicio_seleccionado: hora,
      hora_fin_seleccionado: (parseInt(hora ?? '0') + 2).toString() + ':00',
    }),
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
}));
