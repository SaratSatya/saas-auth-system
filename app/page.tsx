import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          SaaS Auth System
        </h1>

        <p className="mt-2 text-center text-sm text-gray-600">
          Secure authentication with role-based access control
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/login"
            className="block w-full rounded-md bg-black px-4 py-2 text-center text-white hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block w-full rounded-md border border-gray-300 px-4 py-2 text-center text-gray-900 hover:bg-gray-50 transition"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
