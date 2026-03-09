export const generateHours = () => {
  const hours = [];

  for (let i = 17; i <= 23; i++) {
    hours.push(`${i}:00`);
  }

  return hours;
};
