import { Cancha } from '../interface';
import { supabase } from '../lib/supabase';

export const getCanchas = async (): Promise<Cancha[]> => {
  try {
    const { data, error } = await supabase.from('canchas').select('*').eq('activo', true).order('nombre', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const startAddCancha = async (data: Partial<Cancha>): Promise<boolean> => {
  try {
    const { error } = await supabase.from('canchas').insert(data);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const startUpdateCancha = async (data: Partial<Cancha>): Promise<boolean> => {
  try {
    console.log(data);
    const { error } = await supabase.from('canchas').update(data).eq('id', data.id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const startDeleteCancha = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('canchas').update({ activo: false }).eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
