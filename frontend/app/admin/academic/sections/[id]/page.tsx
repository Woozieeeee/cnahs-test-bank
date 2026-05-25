interface Props {
  params: {
    id: string;
  };
}

export default function SectionDetailsPage({
  params,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Section Details
        </h1>

        <p className="mt-2 text-slate-500">
          Section ID: {params.id}
        </p>
      </div>
    </div>
  );
}
