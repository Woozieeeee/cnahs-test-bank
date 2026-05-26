import Link from "next/link";

export default function RegisterLinks() {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-medium text-black hover:underline"
      >
        Login here
      </Link>
    </div>
  );
}
