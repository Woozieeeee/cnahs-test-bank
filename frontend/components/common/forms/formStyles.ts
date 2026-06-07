export const formControlClass = `
  w-full
  rounded-xl
  border
  border-input
  bg-background
  px-4
  py-3
  text-foreground

  outline-none

  transition-all
  duration-200

  focus:border-ring

  disabled:cursor-not-allowed
  disabled:opacity-50
`;

export const inputClassName = formControlClass;

export const selectClassName = `
  ${formControlClass}

  cursor-pointer
`;

export const textareaClassName = `
  ${formControlClass}

  resize-none
`;
