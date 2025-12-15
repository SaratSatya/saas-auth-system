import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const row = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!row || row.used || row.expiresAt < new Date()) {
    return Response.json({ error: "Token invalid or expired" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: row.email },
    data: {
      password: await hashPassword(password),
    },
  });

  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });

  return Response.json({ ok: true });
}
