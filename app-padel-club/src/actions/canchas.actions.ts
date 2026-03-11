import { Cancha } from '../interface';
import { supabase } from '../lib/supabase';

export const getCanchas = async (): Promise<Cancha[]> => {
  try {
    const { data, error } = await supabase.from('canchas').select('*');
    console.log(data);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
