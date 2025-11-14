"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function SignUpPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo:
          typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    setLoading(false);

    if (error) alert(error.message);
    else alert("Check your email to confirm your account!");
  }

  async function handleGoogleSignUp() {
    setGoogleLoading(true); // start loading

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });

    setGoogleLoading(false); // stop loading if redirect didn't happen

    if (error) alert(error.message);
  }

  async function handleAnonymousSignup() {
    setGuestLoading(true);
    const { error } = await supabase.auth.signInAnonymously();
    setGuestLoading(false);
    if (error) alert(error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        {/* Left Illustration (same UI as sign-in page) */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-50 to-teal-50 items-center justify-center p-12">
          <img
            src="/path/to/your/meditation-illustration.png"
            alt="Meditation"
            className="max-w-xs w-full"
          />
        </div>

        {/* Right side - Sign Up Form */}
        <div className="w-full md:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Start your emotional wellbeing journey
            </p>

            {/* EMAIL SIGNUP FORM */}
            <form onSubmit={handleEmailSignUp} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="me@example.com"
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium
                hover:bg-teal-600 transition disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignUp}
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

              {googleLoading ? "Connecting..." : "Sign up with Google"}
            </button>

            {/* Guest Login */}
            <button
              onClick={handleAnonymousSignup}
              disabled={guestLoading}
              className="w-full mt-4 bg-gray-800 text-white py-3 rounded-lg font-medium 
              hover:bg-gray-900 transition disabled:opacity-50"
            >
              {guestLoading ? "Signing in..." : "Continue as Guest"}
            </button>

            {/* Link to sign in */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-teal-600 hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
