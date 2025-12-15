"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() =>
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
          })
        }
      >
        Login
      </button>
      <button
          onClick={() =>
          signIn("google", { callbackUrl: "/dashboard" })
          }
      >
        Login with Google
      </button>
      <a href="/forgot-password">Forgot password?</a>


    </div>
  );
}
