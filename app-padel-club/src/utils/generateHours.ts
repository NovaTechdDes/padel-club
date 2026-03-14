'use client';

import { Horario } from '../interface';

export const generateHours = (horario: Horario) => {
  const hours = [];
  const inicio = parseInt(horario.inicio.split(':')[0]);
  const fin = parseInt(horario.fin.split(':')[0]);

  if (fin < inicio) {
    for (let i = inicio; i <= 23; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    for (let i = 0; i <= fin; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
  } else {
    for (let i = inicio; i <= fin; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
  }

  return hours;
};
