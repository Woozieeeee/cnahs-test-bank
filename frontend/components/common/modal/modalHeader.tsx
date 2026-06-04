interface Props {
  title: string;

  description?: string;

  onClose: () => void;
}

export default function ModalHeader({
  title,
  description,
  onClose,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-foreground text-2xl font-bold">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className="text-muted-foreground hover:bg-muted rounded-lg px-3 py-1 transition-all duration-200"
      >
        ✕
      </button>
    </div>
  );
}
