interface Props {
  children: React.ReactNode;
}

export default function PageHeader({ children }: Props) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
      "
    >
      {children}
    </div>
  );
}
