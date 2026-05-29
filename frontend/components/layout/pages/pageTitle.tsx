interface Props {
  title: string;

  description: string;

  children?: React.ReactNode;
}

export default function PageTitle({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="space-y-4">
      {children}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-foreground
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-2
            text-muted-foreground
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
