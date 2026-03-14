import { describe, it, expect, vi, afterEach } from 'vitest';
import { getHourNow } from '../getHourNow';

describe('getHourNow', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('debe devolver la hora actual en formato de 24 horas', () => {
    // Configuramos una fecha falsa a las 15:30:00
    const date = new Date(2026, 2, 14, 15, 30, 0);
    vi.useFakeTimers();
    vi.setSystemTime(date);

    expect(getHourNow()).toBe(15);
  });

  it('debe devolver la hora correcta a medianoche', () => {
    // Configuramos una fecha falsa a las 00:15:00
    const date = new Date(2026, 2, 14, 0, 15, 0);
    vi.useFakeTimers();
    vi.setSystemTime(date);

    expect(getHourNow()).toBe(0);
  });
});
