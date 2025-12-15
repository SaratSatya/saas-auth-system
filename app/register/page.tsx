"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login?verifySent=1");
  };

  return (
    <AuthCard title="Create account">
      <div className="space-y-4">
        <AuthInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <AuthInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <AuthButton onClick={submit}>Create account</AuthButton>
        <p className='text-center text-sm text-zinc-400'>
          Already have an account?{" "}
          <a href="/login" className='text-blue-500 hover:underline'>
          Login
          </a>
        </p>
      </div>
    </AuthCard>
  );
}
