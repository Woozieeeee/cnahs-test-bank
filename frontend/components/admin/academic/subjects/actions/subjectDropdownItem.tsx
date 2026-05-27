interface Props {
  label: string;

  danger?: boolean;

  onClick: () => void;
}

export default function SubjectDropdownItem({
  label,

  danger,

  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-lg
        px-4
        py-2
        text-left
        text-sm
        transition

        ${
          danger
            ? `
              text-red-500
              hover:bg-red-500/10
            `
            : `
              text-foreground
              hover:bg-muted
            `
        }
      `}
    >
      {label}
    </button>
  );
}
