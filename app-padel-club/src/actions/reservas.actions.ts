import { Reserva } from '../interface';
import { supabase } from '../lib/supabase';
import { mensaje } from '../utils/mensaje';
import { startAddReservaFija, startUpdateReservaFija } from './reservaFija.actions';

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

    const { data: dataFija, error: errorFija } = await supabase.rpc('verificar_reserva_fija', {
      p_hora_inicio: reserva.hora_inicio,
      p_hora_fin: reserva.hora_fin,
      p_cancha: reserva.cancha_id,
      p_fecha: reserva.fecha,
    });

    console.log({ dataFija, errorFija, data, error });

    if (!dataFija) {
      mensaje('La cancha ya se encuentra reservada en ese horario con turno Fijo', 'error');
      return false;
    }

    if (errorFija) throw errorFija;

    if (reserva.fijo) {
      const res = await startAddReservaFija(reserva);
      return res;
    }

    const { id, fijo, ...reservaAdd } = reserva;

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

    const { data: existeReserva, error: errorExisteReserva } = await supabase.rpc('verificar_reserva_fija', {
      p_hora_inicio: reserva.hora_inicio,
      p_hora_fin: reserva.hora_fin,
      p_cancha: reserva.cancha_id,
      p_fecha: reserva.fecha,
    });
    console.log(reserva);
    console.log({ existeReserva, errorExisteReserva });

    if (errorExisteReserva) throw errorExisteReserva;

    if (!existeReserva) {
      mensaje('La cancha ya se encuentra reservada en ese horario como fijo', 'error');
      return false;
    }

    const { fijo, ...reservaUpdate } = reserva;

    if (fijo) {
      const res = await startUpdateReservaFija(reserva);
      return res;
    }

    console.log(reservaUpdate);
    const { error: errorUpdate } = await supabase.from('reserva').update(reservaUpdate).eq('id', reserva.id);

    if (errorUpdate) throw errorUpdate;

    return true;
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    throw error;
  }
};

export const startDeleteReserva = async ({ id, fijo }: { id: string; fijo: boolean }): Promise<boolean> => {
  try {
    if (fijo) {
      const { error } = await supabase.from('reserva_fija').update({ activo: false }).eq('id', id);
      if (error) throw error;
      return true;
    }

    const { error } = await supabase.from('reserva').update({ activo: false }).eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    throw error;
  }
};
