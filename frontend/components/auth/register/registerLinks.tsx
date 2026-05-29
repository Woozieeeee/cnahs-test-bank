import Link from "next/link";

import { authLinkClass } from "../shared/authLinkClass";

export default function RegisterLinks() {
  return (
    <div className="mt-6 text-center">
      <Link href="/login" className={authLinkClass}>
        Back to login
      </Link>
    </div>
  );
}
