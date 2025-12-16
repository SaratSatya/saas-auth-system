import { prisma } from "@/lib/prisma";
import AdminActions from "./AdminActions";

export default async function AdminPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <AdminActions users={users} />
    </div>
  );
}
