"use client";

import { useTransition } from "react";

export default function AdminActions({ users }: { users: any[] }) {
  const [, startTransition] = useTransition();

  const act = (userId: string, action: string) => {
    startTransition(async () => {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      window.location.reload();
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 mt-6">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-zinc-300">
          <tr>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-black">
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-t border-zinc-800 hover:bg-zinc-900 transition"
            >
              <td className="px-4 py-3 text-white">{u.email}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    u.role === "ADMIN"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-zinc-700 text-zinc-200"
                  }`}
                >
                  {u.role}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    u.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {u.isActive ? "Active" : "Disabled"}
                </span>
              </td>

              <td className="px-4 py-3 space-x-2">
                {u.role === "USER" && (
                  <button
                    onClick={() => act(u.id, "PROMOTE")}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Promote
                  </button>
                )}

                {u.role === "ADMIN" && (
                  <button
                    onClick={() => act(u.id, "DEMOTE")}
                    className="px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    Demote
                  </button>
                )}

                {u.isActive ? (
                  <button
                    onClick={() => act(u.id, "DEACTIVATE")}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={() => act(u.id, "ACTIVATE")}
                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500"
                  >
                    Enable
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
