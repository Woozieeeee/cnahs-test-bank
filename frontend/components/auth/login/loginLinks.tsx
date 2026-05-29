import Link from "next/link";

import { authLinkClass } from "../shared/authLinkClass";

export default function LoginLinks() {
  return (
    <div
      className="
        mt-6
        flex
        flex-col
        gap-3
        text-center
      "
    >
      <Link href="/register" className={authLinkClass}>
        Create an account
      </Link>

      <Link href="/track-status" className={authLinkClass}>
        Track registration status
      </Link>
    </div>
  );
}
