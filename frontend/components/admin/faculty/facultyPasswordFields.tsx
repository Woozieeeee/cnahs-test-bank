import PasswordInput from "@/components/common/passwordInput";

import PasswordRules from "@/components/auth/shared/passwordRules";

import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";

interface Props {
  password: string;

  setPassword: (value: string) => void;

  confirmPassword: string;

  setConfirmPassword: (value: string) => void;

  hasMinLength: boolean;

  hasUppercase: boolean;

  hasLowercase: boolean;

  hasNumber: boolean;

  hasSymbol: boolean;

  passwordsMatch: boolean;
}

export default function FacultyPasswordFields({
  password,

  setPassword,

  confirmPassword,

  setConfirmPassword,

  hasMinLength,

  hasUppercase,

  hasLowercase,

  hasNumber,

  hasSymbol,

  passwordsMatch,
}: Props) {
  return (
    <div className="space-y-4">
      {/* PASSWORD */}

      <div>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
          className=" w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          outline-none
          transition
          focus:border-ring"
        />

        <PasswordRules
          hasMinLength={hasMinLength}
          hasUppercase={hasUppercase}
          hasLowercase={hasLowercase}
          hasNumber={hasNumber}
          hasSymbol={hasSymbol}
        />
      </div>

      {/* CONFIRM PASSWORD */}

      <div>
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm Password"
          className=" w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          outline-none
          transition
          focus:border-ring"
        />

        <PasswordMatchIndicator
          visible={!!confirmPassword}
          match={passwordsMatch}
        />
      </div>
    </div>
  );
}
