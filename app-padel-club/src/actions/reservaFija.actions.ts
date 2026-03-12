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

export const startAddReservaFija = async (reserva: Reserva) => {
  try {
    const { id, fijo, ...reservaAdd } = reserva;

    const { data: existeReserva, error: errorExisteReserva } = await supabase.rpc('verificar_reserva', {
      p_hora_inicio: reserva.hora_inicio,
      p_hora_fin: reserva.hora_fin,
      p_cancha: reserva.cancha_id,
      p_fecha: reserva.fecha,
    });

    if (errorExisteReserva) throw errorExisteReserva;

    if (existeReserva) {
      mensaje('Ya existe una reserva en ese horario', 'error');
      return false;
    }

    const fecha = parseISO(reserva.fecha);
    const dia = getDay(fecha);

    const { data, error } = await supabase
      .from('reserva_fija')
      .insert({ dia_semana: dia, ...reservaAdd })
      .select();

    if (error) throw error;

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
