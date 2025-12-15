"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) router.push("/login?reset=1");
  };

  return (
    <AuthCard title="Set new password">
      <div className="space-y-4">
        <AuthInput
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton onClick={submit}>Update password</AuthButton>

        <a href="/login" className="block text-center text-sm text-zinc-400">
          Back to login
        </a>
      </div>
    </AuthCard>
  );
}
