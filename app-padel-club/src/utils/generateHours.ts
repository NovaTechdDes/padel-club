'use client';

import { Horario } from '../interface';

export const generateHours = (horario: Horario) => {
  const hours = [];
  const inicio = parseInt(horario.inicio.split(':')[0]);
  const fin = parseInt(horario.fin.split(':')[0]);

  for (let i = inicio; i <= fin; i++) {
    hours.push(`${i}:00`);
  }

  return hours;
};
