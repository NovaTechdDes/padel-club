import { getDay, parseISO } from 'date-fns';
import { Reserva } from '../interface';
import { supabase } from '../lib/supabase';
import { mensaje } from '../utils/mensaje';

export const startGetReservaFija = async (fecha: string) => {
  try {
    const { data, error } = await supabase.from('reserva_fija').select('*').eq('activo', true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const startAddReservaFija = async (reserva: Reserva): Promise<boolean> => {
  try {
    const { id, fijo, ...reservaAdd } = reserva;

    console.log({ id, fijo });

    const fecha = parseISO(reserva.fecha);
    const dia = getDay(fecha);

    const { data, error } = await supabase
      .from('reserva_fija')
      .insert({ dia_semana: dia, ...reservaAdd })
      .select();

    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const startUpdateReservaFija = async (reserva: Reserva) => {
  try {
    const { id, fijo, ...reservaUpdate } = reserva;

    const fecha = parseISO(reserva.fecha);
    const dia = getDay(fecha);

    const { data, error } = await supabase
      .from('reserva_fija')
      .update({ dia_semana: dia, ...reservaUpdate })
      .eq('id', id)
      .select();

    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
