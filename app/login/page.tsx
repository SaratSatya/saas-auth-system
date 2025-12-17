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

        {/* ✅ Google button – visible by default */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full rounded-md border border-gray-300 bg-white py-2 text-sm text-gray-900 hover:bg-gray-400 transition"
        >
          Continue with Google
        </button>

        {/* ✅ Links – never disappear on hover */}
        <div className="flex justify-between text-sm text-white-600">
          <a
            href="/register"
            className="hover:text-red-600 transition"
          >
            Create account
          </a>
          <a
            href="/forgot-password"
            className="hover:text-red-600 transition"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </AuthCard>
  );
}
