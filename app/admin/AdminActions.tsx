"use client";

import { useTransition } from "react";

export default function AdminActions({ users }: { users: any[] }) {
  const [isPending, startTransition] = useTransition();

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
    <table className="w-full border mt-4">
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t">
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.isActive ? "Active" : "Disabled"}</td>
            <td className="space-x-2">
              {u.role === "USER" && (
                <button onClick={() => act(u.id, "PROMOTE")}>Promote</button>
              )}
              {u.role === "ADMIN" && (
                <button onClick={() => act(u.id, "DEMOTE")}>Demote</button>
              )}
              {u.isActive && (
                <button onClick={() => act(u.id, "DEACTIVATE")}>Disable</button>
              )}
              {!u.isActive && (
                <button onClick={()=>act(u.id,"ACTIVATE")} className='px-2 py-1 bg-green-600 text-whte rounded'>Enable</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
