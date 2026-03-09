import { format } from "date-fns";
export const getDay = () => {
  const result = format(new Date(), "dd 'de' MMMM yyyy");
  return result;
};
