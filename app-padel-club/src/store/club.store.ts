import { create } from 'zustand';
import { Cancha, Horario } from '../interface';

interface ClubState {
  canchas: Cancha[];
  horario: Horario;

  // Actions for Courts
  addCancha: (nombre: string, precio: number) => void;
  updateCancha: (id: string, updates: Partial<Cancha>) => void;
  deleteCancha: (id: string) => void;

  // Actions for Schedule
  setHorario: (horario: Horario) => void;
}

export const useClubStore = create<ClubState>((set) => ({
  canchas: [],
  horario: { inicio: '', fin: '' },

  addCancha: (nombre, precio) =>
    set((state) => ({
      canchas: [
        ...state.canchas,
        {
          id: Math.random().toString(36).substring(2, 9),
          nombre,
          precio,
          activo: true,
        },
      ],
    })),

  updateCancha: (id, updates) =>
    set((state) => ({
      canchas: state.canchas.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  deleteCancha: (id) =>
    set((state) => ({
      canchas: state.canchas.filter((c) => c.id !== id),
    })),

  setHorario: (horario) => set({ horario }),
}));
