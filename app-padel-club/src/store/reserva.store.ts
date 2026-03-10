import { create } from "zustand";
import { Reserva } from "../interface";

interface ReservaState {
  fecha: Date;

  modal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;

  reservaSeleccionado: Reserva | null;
  setReservaSeleccionado: (reserva: Reserva) => void;
}

export const useReservaStore = create<ReservaState>((set) => ({
  fecha: new Date(),

  modal: false,
  abrirModal: () => set({ modal: true }),
  cerrarModal: () => set({ modal: false }),

  reservaSeleccionado: null,
  setReservaSeleccionado: (reserva) => set({ reservaSeleccionado: reserva }),
}));
