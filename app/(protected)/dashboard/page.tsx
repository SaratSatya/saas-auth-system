import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const role = (session.user as any).role;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg border">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back,
        </h1>

        <p className="mt-1 text-gray-800 font-medium break-all">
          {session.user.email}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Role: <span className="font-semibold">{role}</span>
        </p>

        <div className="mt-6 space-y-3">
          {/* COMMON ACTIONS */}
          <Link
            href="/forgot-password"
            className="block w-full rounded-md border px-4 py-2 text-center text-gray-800 hover:bg-gray-50 transition"
          >
            Change Password
          </Link>

          {/* ADMIN ONLY */}
          {role === "ADMIN" && (
            <>
              <Link
                href="/admin"
                className="block w-full rounded-md bg-black px-4 py-2 text-center text-white hover:bg-gray-800 transition"
              >
                Go to Admin Panel
              </Link>

              <Link
                href="/admin/audits"
                className="block w-full rounded-md border px-4 py-2 text-center text-gray-800 hover:bg-gray-50 transition"
              >
                View Audit Logs
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
