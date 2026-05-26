import Link from "next/link";

export default function LoginLinks() {
  return (
    <>
      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-black hover:underline"
        >
          Register here
        </Link>
      </div>

      <div className="mt-2 text-center text-sm">
        <Link
          href="/track-status"
          className="text-gray-600 hover:underline"
        >
          Track application status
        </Link>
      </div>
    </>
  );
}
