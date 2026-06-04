interface Props {
  name: string;

  setName: (value: string) => void;

  username: string;

  setUsername: (value: string) => void;
}

export default function FacultyFormFields({
  name,

  setName,

  username,

  setUsername,
}: Props) {
  return (
    <div className="space-y-4">
      {/* NAME */}

      <input
        type="text"
        placeholder="Faculty Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-input bg-background focus:border-ring w-full rounded-xl border px-4 py-3 transition outline-none"
      />

      {/* USERNAME */}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-input bg-background focus:border-ring w-full rounded-xl border px-4 py-3 transition outline-none"
      />
    </div>
  );
}
