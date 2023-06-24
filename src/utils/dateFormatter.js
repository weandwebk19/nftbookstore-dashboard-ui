export const dateFormatter = (dateString) => {
  const d = new Date(dateString).toLocaleString();
  return d;
};
