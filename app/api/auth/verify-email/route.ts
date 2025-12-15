import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) redirect("/login?error=InvalidToken");

  const row = await prisma.verificationToken.findUnique({ where: { token } });
  if (!row) redirect("/login?error=InvalidToken");
  if (row.expiresAt < new Date()) redirect("/login?error=TokenExpired");

  await prisma.user.update({
    where: { email: row.email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  redirect("/login?verified=1");
}
