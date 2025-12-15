import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import {sendEmail} from "@/lib/email"
export const runtime = "nodejs";
import crypto from "crypto"
import { validatePassword } from   "@/lib/password-policy";


export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Email and password required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: "Email already registered" }, { status: 409 });
  }
  const passwordError=validatePassword(password);
  if(passwordError){
    return Response.json({error:passwordError},{status:400});
  }
  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashed,
      role: "USER",
      emailVerified: null,
    },
  });

  const token = crypto.randomUUID();
  await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  await sendEmail({
  to: email,
  subject: "Verify your email",
  title: "Verify your email address",
  message: "Welcome! Please verify your email to activate your account.",
  actionText: "Verify Email",
  actionLink: verifyUrl,
});


  return Response.json({ ok: true });
}
