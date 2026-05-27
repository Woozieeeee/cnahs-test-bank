export const formatName = (value: string) => {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (!word) return "";

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
