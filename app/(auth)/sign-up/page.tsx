"use client";

import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleAnonymousSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously();
    setLoading(false);

    if (error) alert(error.message);
    else alert("Signed in as guest!");
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {/* Supabase Email/Password + Google */}
        <div suppressHydrationWarning>
        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          redirectTo={
            typeof window !== "undefined" ? window.location.origin : undefined
          }
        />
        </div>

        {/* Anonymous Signup */}
        <button
          onClick={handleAnonymousSignup}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
        >
          {loading ? "Signing in..." : "Continue as Guest"}
        </button>

      </div>
    </div>
  );
}
