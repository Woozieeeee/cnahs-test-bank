interface Props {
  children: React.ReactNode;
}

export default function FormLabel({ children }: Props) {
  return (
    <label className="text-muted-foreground text-sm font-medium">
      {children}
    </label>
  );
}
