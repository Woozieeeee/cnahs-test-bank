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
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          outline-none
          transition
          focus:border-ring
        "
      />

      {/* USERNAME */}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          outline-none
          transition
          focus:border-ring
        "
      />
    </div>
  );
}
