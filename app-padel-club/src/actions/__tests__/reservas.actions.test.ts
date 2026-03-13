import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getReservas, startAddReserva, startUpdateReserva, startDeleteReserva } from '../reservas.actions';
import { supabase } from '../../lib/supabase';
import { mensaje } from '../../utils/mensaje';

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
    })),
    rpc: vi.fn(),
  },
}));

vi.mock('../../utils/mensaje', () => ({
  mensaje: vi.fn(),
}));

vi.mock('../reservaFija.actions', () => ({
  startAddReservaFija: vi.fn().mockResolvedValue(true),
  startUpdateReservaFija: vi.fn().mockResolvedValue(true),
}));

describe('reservas.actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getReservas', () => {
    it('should fetch reservations for a given date', async () => {
      const mockData = [{ id: '1', name: 'Test' }];
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        then: vi.fn((cb) => cb({ data: mockData, error: null })),
      };
      (supabase.from as any).mockReturnValue(mockQuery);

      const result = await getReservas('2026-03-13');
      expect(result).toEqual(mockData);
      expect(supabase.from).toHaveBeenCalledWith('reserva');
    });

    it('should throw error when supabase returns error', async () => {
      const mockError = new Error('Supabase error');
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        then: vi.fn((cb) => cb({ data: null, error: mockError })),
      };
      (supabase.from as any).mockReturnValue(mockQuery);

      await expect(getReservas('2026-03-13')).rejects.toThrow('Supabase error');
    });
  });

  describe('startAddReserva', () => {
    const mockReserva: any = {
      hora_inicio: '10:00',
      hora_fin: '11:00',
      cancha_id: '1',
      fecha: '2026-03-13',
      fijo: false,
    };

    it('should add a reservation when verification passes', async () => {
      (supabase.rpc as any)
        .mockResolvedValueOnce({ data: true, error: null }) // verificar_reserva
        .mockResolvedValueOnce({ data: true, error: null }); // verificar_reserva_fija
      
      const mockQuery = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        then: vi.fn((cb) => cb({ data: { id: '123' }, error: null })),
      };
      (supabase.from as any).mockReturnValue(mockQuery);

      const result = await startAddReserva(mockReserva);
      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('reserva');
    });

    it('should return false and show message if verification fails', async () => {
      (supabase.rpc as any).mockResolvedValueOnce({ data: false, error: null });

      const result = await startAddReserva(mockReserva);
      expect(result).toBe(false);
      expect(mensaje).toHaveBeenCalledWith(expect.any(String), 'error');
    });
  });

  describe('startDeleteReserva', () => {
    it('should update activo to false for regular reservation', async () => {
      (supabase.from as any).mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      });

      const result = await startDeleteReserva({ id: '1', fijo: false });
      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('reserva');
    });

    it('should update activo to false for fixed reservation', async () => {
      (supabase.from as any).mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      });

      const result = await startDeleteReserva({ id: '1', fijo: true });
      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('reserva_fija');
    });
  });
});
