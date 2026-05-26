interface Props {
  hasMinLength: boolean;

  hasUppercase: boolean;

  hasLowercase: boolean;

  hasNumber: boolean;

  hasSymbol: boolean;
}

export default function PasswordRules({
  hasMinLength,

  hasUppercase,

  hasLowercase,

  hasNumber,

  hasSymbol,
}: Props) {
  return (
    <div
      className="
        mt-3
        space-y-1
        text-sm
      "
    >
      <PasswordRule
        valid={hasMinLength}
        label="At least 8 characters"
      />

      <PasswordRule
        valid={hasUppercase}
        label="Uppercase letter"
      />

      <PasswordRule
        valid={hasLowercase}
        label="Lowercase letter"
      />

      <PasswordRule valid={hasNumber} label="Number" />

      <PasswordRule
        valid={hasSymbol}
        label="Special character"
      />
    </div>
  );
}

function PasswordRule({
  valid,

  label,
}: {
  valid: boolean;

  label: string;
}) {
  return (
    <p
      className={`flex items-center gap-2 ${
        valid ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <span>{valid ? "✓" : "•"}</span>

      <span>{label}</span>
    </p>
  );
}
