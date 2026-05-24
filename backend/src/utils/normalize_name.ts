export const normalizeName = (name: string) => {
  return name.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
};
