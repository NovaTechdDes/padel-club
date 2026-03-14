import { describe, it, expect } from 'vitest';
import { getDurationInHours } from '../getDurationInHours';

describe('getDurationInHours', () => {
  it('calcula correctamente la duración con horas enteras', () => {
    expect(getDurationInHours('10:00', '12:00')).toBe(2);
  });

  it('calcula correctamente la duración con medias horas', () => {
    expect(getDurationInHours('10:30', '12:00')).toBe(1.5);
    expect(getDurationInHours('10:00', '11:30')).toBe(1.5);
  });

  it('calcula correctamente la duración de 1 hora y media en la misma hora', () => {
    expect(getDurationInHours('10:00', '10:30')).toBe(0.5);
  });

  it('calcula la duración correctamente pasando el mediodía', () => {
    expect(getDurationInHours('11:00', '14:30')).toBe(3.5);
  });
});
