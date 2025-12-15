import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Do NOT reveal if user exists (security)
  if (!user) {
    return Response.json({ ok: true });
  }

  const token = crypto.randomUUID();

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    "Reset your password",
    `<p>Click to reset password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  );

  return Response.json({ ok: true });
}
