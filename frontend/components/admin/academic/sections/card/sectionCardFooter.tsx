export default function SectionCardFooter() {
  return (
    <div
      className="
        mt-6
        flex
        items-center
        justify-between
        border-t
        border-border
        pt-4
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        View section details
      </p>

      <span
        className="
          text-sm
          font-medium
          text-foreground
        "
      >
        →
      </span>
    </div>
  );
}
