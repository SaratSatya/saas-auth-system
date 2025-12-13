"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  );
}
