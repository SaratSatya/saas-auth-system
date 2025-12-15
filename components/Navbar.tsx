"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4 text-white">
      <Link href="/dashboard" className="text-lg font-semibold">
        SaaS Auth
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
