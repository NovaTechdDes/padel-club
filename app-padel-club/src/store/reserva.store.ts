import { create } from "zustand";
import { Reserva } from "../interface";

interface ReservaState {
  fecha: Date;
  setFecha: (fecha: Date) => void;

  modal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;

  reservaSeleccionado: Reserva | null;
  setReservaSeleccionado: (reserva: Reserva) => void;
}

export const useReservaStore = create<ReservaState>((set) => ({
  fecha: new Date(),
  setFecha: (fecha) => set({fecha}),

  modal: false,
  abrirModal: () => set({ modal: true }),
  cerrarModal: () => set({ modal: false }),

  reservaSeleccionado: null,
  setReservaSeleccionado: (reserva) => set({ reservaSeleccionado: reserva }),
}));
