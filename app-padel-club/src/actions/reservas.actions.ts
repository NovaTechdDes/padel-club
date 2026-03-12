import { Reserva } from '../interface';
import { supabase } from '../lib/supabase';
import { mensaje } from '../utils/mensaje';
import { startAddReservaFija } from './reservaFija.actions';

export const getReservas = async (fecha: string): Promise<Reserva[]> => {
  try {
    const { data, error } = await supabase.from('reserva').select('*').eq('activo', true).eq('fecha', `${fecha}T00:00:00`);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    throw error;
  }
};

export const startAddReserva = async (reserva: Reserva) => {
  try {
    if (reserva.fijo) {
      startAddReservaFija(reserva);
      return;
    }
    const { data, error } = await supabase.rpc('verificar_reserva', {
      p_hora_inicio: reserva.hora_inicio,
      p_hora_fin: reserva.hora_fin,
      p_cancha: reserva.cancha_id,
      p_fecha: reserva.fecha,
    });

    if (!data) {
      mensaje('La cancha ya se encuentra reservada en ese horario', 'error');
      return false;
    }

    if (error) throw error;

    const { id, ...reservaAdd } = reserva;

    console.log(id);

    const { error: errorAdd } = await supabase.from('reserva').insert(reservaAdd).select().single();

    if (errorAdd) throw errorAdd;

    return true;
  } catch (error) {
    console.error('Error al agregar reserva:', error);
    throw error;
  }
};

export const startUpdateReserva = async (reserva: Partial<Reserva>): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('verificar_reserva', {
      p_hora_inicio: reserva.hora_inicio,
      p_hora_fin: reserva.hora_fin,
      p_cancha: reserva.cancha_id,
      p_fecha: reserva.fecha,
    });

    if (!data) {
      mensaje('La cancha ya se encuentra reservada en ese horario', 'error');
      return false;
    }

    if (error) throw error;

    const { error: errorUpdate } = await supabase.from('reserva').update(reserva).eq('id', reserva.id);

    if (errorUpdate) throw errorUpdate;

    return true;
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    throw error;
  }
};

export const startDeleteReserva = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('reserva').update({ activo: false }).eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    throw error;
  }
};
