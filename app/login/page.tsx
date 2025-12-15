"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard title="Login">
      <div className="space-y-4">
        <AuthInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/dashboard",
            })
          }
        >
          Login
        </AuthButton>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full rounded-md border border-zinc-700 py-2 text-sm hover:bg-zinc-800 transition"
        >
          Continue with Google
        </button>

        <div className="flex justify-between text-sm text-zinc-400">
          <a href="/register" className="hover:text-white">
            Create account
          </a>
          <a href="/forgot-password" className="hover:text-white">
            Forgot password?
          </a>
        </div>
      </div>
    </AuthCard>
  );
}
