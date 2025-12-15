import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {redirect} from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if(!session) redirect("/login")

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">
          Welcome, {session?.user?.email}
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="mb-2 font-medium">Role</h2>
            <p className="text-zinc-400">
              {(session?.user as any)?.role}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="mb-2 font-medium">Auth Methods</h2>
            <p className="text-zinc-400">
              Credentials / Google OAuth
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
