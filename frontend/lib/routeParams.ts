export const extractId = (value: string | string[]) => {
  const raw = Array.isArray(value) ? value[0] : value;

  return Number(raw.split("-")[0]);
};
