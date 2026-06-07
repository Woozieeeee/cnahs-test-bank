export const generateExamCode = () => {
  return (
    "EXM-" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substring(2, 5).toUpperCase()
  );
};
