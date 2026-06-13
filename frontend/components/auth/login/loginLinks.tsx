import Link from "next/link";

import { authLinkClass } from "../shared/authLinkClass";

interface Props {
  onForgotPassword?: () => void;
}

export default function LoginLinks({
  onForgotPassword,
}: Props) {
  return (
    <div className="mt-6 flex flex-col gap-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-muted-foreground">
          Don't have an account?
        </span>
        <Link
          href="/register"
          className="font-medium text-blue-500 hover:underline"
        >
          Register here
        </Link>
      </div>

      {/* Changed from grid to flex with justify-between */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onForgotPassword}
          className={`${authLinkClass} text-sm`}
        >
          Forgot password?
        </button>
        <Link
          href="/track-status"
          className={`${authLinkClass} text-sm`}
        >
          Track registration status
        </Link>
      </div>
    </div>
  );
}
