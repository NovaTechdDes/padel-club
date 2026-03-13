import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startGetReservaFija, startAddReservaFija, startUpdateReservaFija } from '../reservaFija.actions';
import { supabase } from '../../lib/supabase';

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
    })),
  },
}));

describe('reservaFija.actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('startGetReservaFija', () => {
    it('should fetch all active fixed reservations', async () => {
      const mockData = [{ id: '1', dia_semana: 1 }];
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        then: vi.fn((cb) => cb({ data: mockData, error: null })),
      };
      (supabase.from as any).mockReturnValue(mockQuery);

      const result = await startGetReservaFija('2026-03-13');
      expect(result).toEqual(mockData);
      expect(supabase.from).toHaveBeenCalledWith('reserva_fija');
    });
  });

  describe('startAddReservaFija', () => {
    it('should add a fixed reservation with correct day of week', async () => {
      const mockReserva: any = {
        fecha: '2026-03-13', // This is a Friday (getDay = 5)
        hora_inicio: '10:00',
        hora_fin: '11:00',
        cancha_id: '1',
      };

      const mockQuery = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        then: vi.fn((cb) => cb({ data: [{}], error: null })),
      };
      (supabase.from as any).mockReturnValue(mockQuery);

      const result = await startAddReservaFija(mockReserva);
      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('reserva_fija');
      // getDay for 2026-03-13 (Friday) should be 5
      expect(supabase.from('reserva_fija').insert).toHaveBeenCalledWith(expect.objectContaining({
        dia_semana: 5
      }));
    });
  });
});
