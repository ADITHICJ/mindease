"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
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
    <nav className="w-full flex justify-between items-center px-10 py-6 shadow-sm bg-white fixed top-0 left-0 z-50">
      <h2 className="text-xl font-bold">MindEase</h2>

      <div className="flex space-x-6 items-center">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="#tools" className="hover:text-blue-600">Tools</Link>
        <Link href="#faq" className="hover:text-blue-600">FAQ</Link>

        {!user ? (
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
