export const getDurationInHours = (inicio: string, fin: string) => {
  const [h1, m1] = inicio.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  return h2 + m2 / 60 - (h1 + m1 / 60);
};
