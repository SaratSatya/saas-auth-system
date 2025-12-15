import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AuditPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Audit Logs</h1>
      {logs.map((log) => (
        <div key={log.id}>
          {log.action} - {log.createdAt.toISOString()}
        </div>
      ))}
    </div>
  );
}
