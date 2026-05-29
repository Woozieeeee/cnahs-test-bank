interface Props {
  label: string;

  danger?: boolean;

  onClick: (e: React.MouseEvent) => void;
}

export default function SectionDropdownItem({
  label,
  danger,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        rounded-lg
        px-3
        py-2
        text-sm
        transition

        ${
          danger
            ? `
              text-red-600
              hover:bg-red-50
            `
            : `
              hover:bg-muted
            `
        }
      `}
    >
      {label}
    </button>
  );
}
