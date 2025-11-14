"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/auth");
      else setSession(data.session);
    });
  }, [router]);

  const upgradeAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ email, password });
    if (error) alert(error.message);
    else alert("Account upgraded!");
  };

  if (!session) return <p>Loading...</p>;

  const user = session.user;
  const isAnonymous = user.is_anonymous;

  return (
    <div style={{ padding: 20 }}>
      <h2>Account</h2>
      <p>User ID: {user.id}</p>

      {isAnonymous ? (
        <>
          <p>You are signed in as <b>Anonymous</b>.</p>

          <h3>Upgrade Account</h3>
          <form onSubmit={upgradeAccount}>
            <input
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" style={{ marginTop: 10 }}>
              Upgrade Account
            </button>
          </form>
        </>
      ) : (
        <p>Email: {user.email}</p>
      )}

      <button
        onClick={() => supabase.auth.signOut()}
        style={{ marginTop: 20, padding: "8px 14px" }}
      >
        Logout
      </button>
    </div>
  );
}
