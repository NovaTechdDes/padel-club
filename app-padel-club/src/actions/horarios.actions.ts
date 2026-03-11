import { Horario } from '../interface';
import { supabase } from '../lib/supabase';

export const getHorarios = async (): Promise<Horario> => {
  try {
    const { data, error } = await supabase.from('horario').select('*').single();
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

export const startPutHorario = async (horario: Partial<Horario>): Promise<boolean> => {
  try {
    const { error } = await supabase.from('horario').update(horario).eq('id', horario.id);

    if (!error) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
    return false;
  }
};
