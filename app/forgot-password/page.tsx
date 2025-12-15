"use client";

import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setDone(true);
  };

  if (done) {
    return (
      <AuthCard title="Check your email">
        <p className="text-center text-sm text-zinc-400">
          If the email exists, a reset link has been sent.
        </p>
        <a href="/login" className="mt-4 block text-center text-blue-500">
          Back to login
        </a>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Forgot password">
      <div className="space-y-4">
        <AuthInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthButton onClick={submit}>Send reset link</AuthButton>

        <a href="/login" className="block text-center text-sm text-zinc-400">
          Back to login
        </a>
      </div>
    </AuthCard>
  );
}
