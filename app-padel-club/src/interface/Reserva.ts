export interface Reserva {
  id?: string;
  cancha_id?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean;
  nombre_cliente: string;
  telefono_cliente?: string;
  precio?: number;

  fijo?: boolean;
}
