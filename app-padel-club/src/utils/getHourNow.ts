import { getHours } from 'date-fns';

export const getHourNow = (): number => {
  return getHours(new Date());
};
