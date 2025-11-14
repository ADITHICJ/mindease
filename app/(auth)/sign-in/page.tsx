"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/utils/supabase/client";

export default function SignInPage() {
  const supabase = createClient();

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {/* Supabase Email/Password + Google */}
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          redirectTo={
            typeof window !== "undefined" ? window.location.origin : undefined
          }
        />

      </div>
    </div>
  );
}
