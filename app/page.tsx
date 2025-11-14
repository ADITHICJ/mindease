"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function HomePage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>

      {/* If user is not logged in */}
      {!user && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg">You are not logged in.</p>

          <Link
            href="/sign-in"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Create Account
          </Link>
        </div>
      )}

      {/* If user is logged in */}
      {user && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg">
            Logged in as: <span className="font-semibold">{user.email ?? "Anonymous User"}</span>
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

    </main>
  );
}
