"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SignInPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  // Email + Password Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) alert(error.message);
    else window.location.href = "/";
  }

  // Google OAuth
  async function handleGoogleLogin() {
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });

    setGoogleLoading(false);
    if (error) alert(error.message);
  }

  // Guest Login (anonymous)
  async function handleAnonymousLogin() {
    setGuestLoading(true);
    const { error } = await supabase.auth.signInAnonymously();
    setGuestLoading(false);

    if (error) alert(error.message);
    else window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-12">
          <img
            src="/path/to/your/meditation-illustration.png"
            alt="Meditation"
            className="max-w-xs w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mb-8 text-center">
              Sign in to continue your wellbeing journey
            </p>

            {/* EMAIL LOGIN FORM */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium 
                hover:bg-teal-600 transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full mt-6 flex items-center justify-center gap-3 
             border border-gray-300 bg-white 
             text-gray-700 font-medium py-2.5 rounded-xl
             shadow-sm hover:bg-gray-50 transition
             disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Google Icon */}
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />

              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Guest Button */}
            <button
              onClick={handleAnonymousLogin}
              disabled={guestLoading}
              className="w-full mt-4 bg-gray-800 text-white py-3 rounded-lg 
              font-medium hover:bg-gray-900 transition disabled:opacity-50"
            >
              {guestLoading ? "Signing in..." : "Continue as Guest"}
            </button>

            {/* Redirect Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/sign-up"
                className="text-teal-600 hover:underline font-medium"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
