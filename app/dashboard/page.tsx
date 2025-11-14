"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import MoodCheckin from "@/components/MoodCheckin";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [mood, setMood] = useState("");
  const [quote, setQuote] = useState("");

  const quotes = [
    "You are stronger than you think.",
    "Take a deep breath. You got this.",
    "Small steps every day lead to big results.",
    "Your feelings are valid.",
    "You are doing better than you think.",
  ];

  const generateQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto w-full p-4 mt-8">
        <Card className="p-4 bg-white shadow rounded-xl">
          <CardContent className="text-center">
            <p className="text-lg font-semibold">🔥 5-Day Streak</p>
            <p className="text-gray-600 text-sm">
              Keep going! You're building a great habit.
            </p>
          </CardContent>
        </Card>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6">
        {/* Streak Box */}

        {/* Mood Check-in */}
        <MoodCheckin onSelectMood={(m) => setMood(m)} />

        {/* Random Quote Generator */}
        <Card className="p-4 bg-white shadow rounded-xl">
          <CardContent className="space-y-3 text-center">
            <h3 className="font-semibold text-lg">✨ Random Motivation</h3>
            {quote && <p className="text-gray-700 italic">“{quote}”</p>}
            <button
              onClick={generateQuote}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Generate Quote
            </button>
          </CardContent>
        </Card>

        {/* Personalized AI Recommendation */}
        <Card className="p-4 shadow rounded-xl bg-white">
          <h3 className="font-semibold text-lg mb-2">
            🤖 Personalized Recommendation
          </h3>
          <p className="text-gray-600 text-sm">
            Based on your recent moods, we will soon show personalized mental
            wellness tips, breathing exercises, journaling prompts, and coping
            strategies.
          </p>
        </Card>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-2">
              🧘 Breathing Exercises
            </h3>
            <p className="text-gray-600 text-sm">
              Quick 2–5 minute guided breathing for instant calm.
            </p>
          </Card>

          <Card className="p-4 bg-white shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-2">📔 Journaling</h3>
            <p className="text-gray-600 text-sm">
              Reflect on your thoughts with guided prompts.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
