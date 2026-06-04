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
        <h1 className="text-foreground text-3xl font-bold">
          {title}
        </h1>

        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}
