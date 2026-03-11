/*
    Funcion para conectarse a supabase y luego exportamos la conexion

    key y url son variables que vienen de la configuracion de supabase

*/

import { createClient } from '@supabase/supabase-js';

const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

console.log({ key, url });

export const supabase = createClient(url ?? '', key ?? '');
