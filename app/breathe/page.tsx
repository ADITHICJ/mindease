"use client";

import { useState } from "react";
import { useBreathingTTS } from "./client/useBreathingTTS";

export default function BreathingPage() {
  const [loading, setLoading] = useState(false);
  const { start, ready } = useBreathingTTS();

  async function handleStart() {
    setLoading(true);

    // 👇 Frontend ONLY sends parameters
    const res = await fetch("/api/breathing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exerciseName: "Box Adaptive", // you can make this dynamic later
        totalMinutes: 5,
        inhale: 4,
        hold: 4,
        exhale: 4,
      }),
    });

    const { chunks } = await res.json();

    // Start TTS playback
    await start(chunks);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Guided Breathing Session</h1>

      <button
        onClick={handleStart}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating Script..." : "Start Session"}
      </button>

      {ready && <p className="mt-4">Playing Audio…</p>}
    </div>
  );
}
