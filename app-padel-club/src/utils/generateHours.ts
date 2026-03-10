import { horario } from "../data/horas";

export const generateHours = () => {
  const hours = [];
  const inicio = parseInt(horario.inicio.split(":")[0]);
  const fin = parseInt(horario.fin.split(":")[0]);

  for (let i = inicio; i <= fin; i++) {
    hours.push(`${i}:00`);
  }

  return hours;
};
